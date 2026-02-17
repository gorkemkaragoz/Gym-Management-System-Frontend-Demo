// src/app/trainer/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { AdminMyAccountResponse } from 'src/app/admin/models/responses/admin-myaccount-response.model';
import { EnrolledStudentDto } from 'src/app/trainer/models/responses/enrolled-student';
import { BodyMeasurement } from 'src/app/trainer/models/responses/body-measurement';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/v1/users/management';
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<AdminMyAccountResponse> {
    return this.http.get<AdminMyAccountResponse>(`${this.apiUrl}/me`);
  }

  getMyStudents(): Observable<EnrolledStudentDto[]> {
    return this.http.get<EnrolledStudentDto[]>(`${this.baseUrl}/course-schedules/my-students`);
  }

  getAllBodyMeasurements(): Observable<BodyMeasurement[]> {
    return this.http.get<BodyMeasurement[]>(`${this.baseUrl}/body-measurement`);
  }
}