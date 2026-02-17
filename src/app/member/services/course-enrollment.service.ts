// src/app/member/services/course-enrollment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseEnrollmentResponse } from 'src/app/member/models/responses/course-enrollment-response'; // Adjust the import path as necessary


@Injectable({
  providedIn: 'root'
})
export class CourseEnrollmentService {
  private baseUrl = 'http://localhost:8080/api/v1/course-enrollments';

  constructor(private http: HttpClient) {}

  enroll(scheduleId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/enroll`, { courseScheduleId: scheduleId });
  }

  cancel(scheduleId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cancel/${scheduleId}`);
  }

  getMyEnrollments(): Observable<CourseEnrollmentResponse[]> {
  return this.http.get<CourseEnrollmentResponse[]>(
    'http://localhost:8080/api/v1/course-enrollments/my'
  );
}

}
