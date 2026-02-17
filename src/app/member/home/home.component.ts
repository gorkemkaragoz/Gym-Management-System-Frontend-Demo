// src/app/member/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { CourseScheduleOverviewResponseDto } from 'src/app/admin/models/common/lesson-scheduling.model';
import { HomeService } from '../services/home.service';
import { ToastrService } from 'ngx-toastr';
import { CourseEnrollmentService } from '../services/course-enrollment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  days: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  selectedDay: string = 'MONDAY';
  allSchedules: CourseScheduleOverviewResponseDto[] = [];
  enrolledScheduleIds: Set<number> = new Set();
  enrolledSchedules: any[] = []; // Conflict kontrolü için

  constructor(
    private homeService: HomeService,
    private enrollmentService: CourseEnrollmentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const currentDayIndex = new Date().getDay();
    if (currentDayIndex >= 1 && currentDayIndex <= 6) {
      this.selectedDay = this.days[currentDayIndex - 1];
    }

    this.fetchSchedules();

    this.enrollmentService.getMyEnrollments().subscribe({
      next: (enrollments) => {
        const ids = enrollments.map(e => e.scheduleId);
        this.enrolledScheduleIds = new Set(ids);
        this.enrolledSchedules = enrollments;
      },
      error: (err) => {
        console.error('Enrollments fetch failed', err);
      }
    });
  }

  fetchSchedules(): void {
    this.homeService.getAllSchedules().subscribe({
      next: (data) => {
        this.allSchedules = data;
      },
      error: (err) => {
        console.error('Schedule fetch failed', err);
      }
    });
  }

  selectDay(day: string): void {
    this.selectedDay = day;
  }

  getFilteredSchedules(): CourseScheduleOverviewResponseDto[] {
    return this.allSchedules.filter(schedule => {
      const day = new Date(schedule.courseDate).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
      return day === this.selectedDay;
    });
  }
  
  toggleEnrollment(schedule: CourseScheduleOverviewResponseDto): void {
  const scheduleId = schedule.scheduleId;

  if (this.isEnrolled(scheduleId)) {
  this.enrollmentService.cancel(scheduleId)
    .pipe(finalize(() => {
      this.enrolledScheduleIds.delete(scheduleId);
      this.enrolledSchedules = this.enrolledSchedules.filter(
        s => s.scheduleId !== scheduleId
      );
      schedule.currentStudentCount--;
    }))
    .subscribe({
      next: () => {
        this.toastr.warning('You have cancelled your enrollment.');
      },
      error: () => {
        this.toastr.error('Cancellation failed.');
      }
    });
} else {
    if (schedule.currentStudentCount >= schedule.maxCapacity) {
      this.toastr.error("This course is already full.");
      return;
    }

    if (this.hasScheduleConflict(schedule)) {
      this.toastr.warning("You already have a course at this time.");
      return;
    }

    this.enrollmentService.enroll(scheduleId)
      .pipe(finalize(() => {
        this.enrolledScheduleIds.add(scheduleId);
        this.enrolledSchedules.push(schedule);
        schedule.currentStudentCount++;
      }))
      .subscribe({
        next: () => {
          this.toastr.success('You have successfully joined the course.');
        },
        error: () => {
          this.toastr.error('Join failed.');
        }
      });
  }
}

  isEnrolled(scheduleId: number): boolean {
    return this.enrolledScheduleIds.has(scheduleId);
  }

  hasScheduleConflict(newSchedule: CourseScheduleOverviewResponseDto): boolean {
    const newDate = newSchedule.courseDate;
    const newStart = newSchedule.startTime;
    const newEnd = newSchedule.endTime;

    return this.enrolledSchedules.some(existing => {
      return (
        existing.scheduleId !== newSchedule.scheduleId &&
        existing.courseDate === newDate &&
        existing.startTime < newEnd &&
        existing.endTime > newStart
      );
    });
  }
}