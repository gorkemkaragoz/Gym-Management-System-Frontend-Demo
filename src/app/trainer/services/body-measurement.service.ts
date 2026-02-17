// src/app/trainer/services/body-measurement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BodyMeasurementRequest {
  userId: number;
  weight: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class BodyMeasurementService {
  private apiUrl = 'http://localhost:8080/api/v1/body-measurement';

  constructor(private http: HttpClient) {}

  saveMeasurement(data: BodyMeasurementRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}