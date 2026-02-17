// src/app/trainer/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { CourseScheduleOverviewResponseDto } from 'src/app/admin/models/common/lesson-scheduling.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  days: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  selectedDay: string = 'MONDAY';

  allLessons: CourseScheduleOverviewResponseDto[] = [];
  filteredLessons: CourseScheduleOverviewResponseDto[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    const currentDayIndex = new Date().getDay(); // 0 = Sunday
    this.selectedDay = currentDayIndex >= 1 && currentDayIndex <= 6
      ? this.days[currentDayIndex - 1]
      : 'MONDAY';

    this.homeService.getMyLessons().subscribe({
      next: (data) => {
        this.allLessons = data;
        this.applyDayFilter();
      },
      error: (err) => console.error('Ders programı alınamadı:', err)
    });
  }

  selectDay(day: string): void {
    this.selectedDay = day;
    this.applyDayFilter();
  }

  applyDayFilter(): void {
    this.filteredLessons = this.allLessons.filter(lesson => {
      const lessonDay = new Date(lesson.courseDate).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
      return lessonDay === this.selectedDay;
    });
  }
}

