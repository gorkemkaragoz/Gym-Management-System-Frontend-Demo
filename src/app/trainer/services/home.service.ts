// src/app/trainer/services/home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseScheduleOverviewResponseDto } from 'src/app/admin/models/common/lesson-scheduling.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:8080/api/v1/course-schedules/me';

  constructor(private http: HttpClient) {}

  getMyLessons(): Observable<CourseScheduleOverviewResponseDto[]> {
    return this.http.get<CourseScheduleOverviewResponseDto[]>(this.apiUrl);
  }
}

