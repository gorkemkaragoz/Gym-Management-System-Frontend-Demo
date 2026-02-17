// src/app/admin/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminMyAccountResponse } from '../models/responses/admin-myaccount-response.model';
import { ChangePasswordRequest } from '../../auth/change-password/change-password-request.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<AdminMyAccountResponse> {
    return this.http.get<AdminMyAccountResponse>(`${this.apiUrl}/me`);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/change-password`, request);
  }

  uploadProfilePhoto(userId: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl.replace('/users', '/photos')}/upload/${userId}`, formData, {
      responseType: 'text'
    });
  }

  // İleride şunları da ekleyebilirsin:
  // updateUserProfile(...)
  // uploadProfilePhoto(...)
}