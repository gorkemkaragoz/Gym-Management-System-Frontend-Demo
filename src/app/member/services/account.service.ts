// src/app/member/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BodyMeasurement } from '../models/responses/body-measurement-response.model';
import { AdminMyAccountResponse } from 'src/app/admin/models/responses/admin-myaccount-response.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Artık bu URL kullanılacak çünkü veriler burada daha detaylı
  private apiUrl = 'http://localhost:8080/api/v1/users/management';

  constructor(private http: HttpClient) {}

  /** Giriş yapan kullanıcının detaylı verilerini getirir */
  getCurrentUser(): Observable<AdminMyAccountResponse> {
    return this.http.get<AdminMyAccountResponse>(`${this.apiUrl}/me`);
  }

  getMyBodyMeasurements(): Observable<BodyMeasurement[]> {
  return this.http.get<BodyMeasurement[]>('http://localhost:8080/api/v1/body-measurement');
}

}

