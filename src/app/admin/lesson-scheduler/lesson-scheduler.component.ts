// src/app/admin/lesson-scheduler/lesson-scheduler.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CourseScheduleOverviewResponseDto,
  CourseWithScheduleRequestDto
} from '../models/common/lesson-scheduling.model';
import { LessonSchedulingService } from '../services/lesson-scheduling.service';
import { UserManagementService } from '../services/user-management.service';
import { AdminMyAccountResponse } from '../models/responses/admin-myaccount-response.model';

@Component({
  selector: 'app-lesson-scheduler',
  templateUrl: './lesson-scheduler.component.html',
  styleUrls: ['./lesson-scheduler.component.css']
})
export class LessonSchedulerComponent implements OnInit {
  overview: CourseScheduleOverviewResponseDto[] = [];
  filteredOverview: CourseScheduleOverviewResponseDto[] = [];
  trainers: { id: number; name: string }[] = [];
  days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  form!: FormGroup;
  selectedTrainerId: number | null = null;
  selectedDay = 'All';

  constructor(
    private fb: FormBuilder,
    private schedulingSvc: LessonSchedulingService,
  private userService: UserManagementService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      trainerId: [null, Validators.required],
      courseDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      maxCapacity: [1, [Validators.required, Validators.min(1), Validators.max(25)]],
    });

    // ✅ trainerId seçimini dinliyoruz
    this.form.get('trainerId')?.valueChanges.subscribe(val => {
      console.log('🟡 Seçilen trainerId:', val);
    });

    this.loadOverview();
    this.loadTrainers();
  }

 private loadOverview() {
  this.schedulingSvc.getOverview().subscribe({
    next: data => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Pazar

      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Cumartesi

      // Filtreleme sadece bu haftanın kursları için
      this.overview = data.filter(item => {
        const courseDate = new Date(item.courseDate);
        return courseDate >= startOfWeek && courseDate <= endOfWeek;
      });

      /*
      const map = new Map<number, string>();
      this.overview.forEach(i => map.set(i.trainerId, i.trainerName));
      this.trainers = Array.from(map.entries()).map(([id, name]) => ({ id, name }));
      */

      this.applyFilter();
    },
    error: err => console.error('Overview yükleme hatası', err)
  });
}

private loadTrainers(): void {
    this.userService.getAllTrainers().subscribe({
      next: (data: AdminMyAccountResponse[]) => {
        this.trainers = data.map(t => ({
          id: t.id,
          name: `${t.firstName} ${t.lastName}`
        }));
      },
      error: (err: any) => console.error('Eğitmenler yüklenemedi', err)
    });
  }

  applyFilter() {
    this.filteredOverview = this.overview.filter(item => {
      const trainerMatch = this.selectedTrainerId == null || item.trainerId === this.selectedTrainerId;
      const dayMatch = this.selectedDay === 'All' ||
        new Date(item.courseDate).toLocaleDateString('en-US', { weekday: 'long' }) === this.selectedDay;
      return trainerMatch && dayMatch;
    });
  }

  onTrainerFilterChange(value: number | null) {
  this.selectedTrainerId = value;
  console.log('🟠 Filtre seçimi (trainerId):', value);
  this.applyFilter();
}

  onDayFilterChange(value: string) {
    this.selectedDay = value;
    this.applyFilter();
  }

  compareByValue(v1: any, v2: any): boolean {
    return v1 === v2;
  }

  onAdd() {
  const selectedDate = new Date(this.form.value.courseDate);
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

  if (selectedDate < startOfWeek || selectedDate > endOfWeek) {
    alert("⚠️ Lütfen sadece bu hafta içindeki bir tarih seçin!");
    return;
  }

  if (this.form.invalid) {
    return;
  }

  const payload: CourseWithScheduleRequestDto = { ...this.form.value };

  this.schedulingSvc.addLesson(payload).subscribe({
    next: () => {
      console.log('✅ Ders başarıyla eklendi, overview yükleniyor...');
    this.loadOverview();
    console.log('🔄 Form sıfırlandı.');
      this.loadOverview();
      this.form.reset({
        name: '',
        trainerId: null,
        courseDate: '',
        startTime: '',
        endTime: '',
        maxCapacity: 1
      });
    },
    error: err => console.error('❌ API hatası:', err)
  });
}

}