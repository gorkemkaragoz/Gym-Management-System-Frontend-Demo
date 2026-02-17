// src/app/admin/services/lesson-scheduling.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseScheduleOverviewResponseDto, CourseWithScheduleRequestDto } from '../models/common/lesson-scheduling.model';
import { AdminMyAccountResponse } from '../models/responses/admin-myaccount-response.model';

@Injectable({ providedIn: 'root' })
export class LessonSchedulingService {
  private baseUrl    = 'http://localhost:8080/api/v1';            
  private overviewUrl= `${this.baseUrl}/course-schedules/overview`;
  private createUrl  = `${this.baseUrl}/course/with-schedule`;

  constructor(private http: HttpClient) {}

  /** 1) Tüm schedule’ların özetini getir */
  getOverview(): Observable<CourseScheduleOverviewResponseDto[]> {
    return this.http.get<CourseScheduleOverviewResponseDto[]>(this.overviewUrl);
  }

  /** 2) Yeni ders + program ekle */
  addLesson(payload: CourseWithScheduleRequestDto): Observable<void> {
    return this.http.post<void>(this.createUrl, payload);
  }

  getAllTrainers(): Observable<AdminMyAccountResponse[]> {
  return this.http.get<AdminMyAccountResponse[]>('http://localhost:8080/api/v1/users/trainers');
}
  
}