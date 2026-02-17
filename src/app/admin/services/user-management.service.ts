// src/app/admin/services/user-management.service.ts - Güncellenmiş
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserManagementRequest } from '../models/requests/user-request.model';
import { UpdateUserManagementRequest } from '../models/requests/update-user-request.model';
import { UserManagementResponse } from '../models/responses/user-management-response';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** Admin tarafında tüm kullanıcıları (trainer + member) getirir */
  getAllUsers(): Observable<UserManagementResponse[]> {
    return this.http.get<UserManagementResponse[]>(`${this.baseUrl}/management`);
  }

  /** Yeni kullanıcı oluşturur (Admin için POST) */
  addUser(payload: UserManagementRequest): Observable<UserManagementResponse> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.post<UserManagementResponse>(`${this.baseUrl}/management`, payload, { headers });
}

  /** Kullanıcının profil fotoğrafını yükler */
  uploadUserPhoto(file: File, userId: number): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post<string>(`http://localhost:8080/api/v1/photos/upload/${userId}`, formData, {
    responseType: 'text' as 'json' // bunu typescript için belirtiyorsun, sorun yok
  });
}

  /** Var olan kullanıcıyı günceller (Admin için PATCH) */
  updateUser(id: number, payload: UpdateUserManagementRequest): Observable<UserManagementResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<UserManagementResponse>(`${this.baseUrl}/${id}`, payload, { 
      headers
    });
  }

  /** Tüm eğitmenleri getirir */
  getAllTrainers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/trainers`);
  }
}