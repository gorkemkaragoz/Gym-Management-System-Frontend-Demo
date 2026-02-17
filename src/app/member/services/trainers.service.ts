// src: src/app/member/services/trainers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trainer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  certificateName:String;
  issuedBy: string;
  issuedDate: string;
  photoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrainersService {
  private baseUrl = 'http://localhost:8080/api/v1/users/trainers';

  constructor(private http: HttpClient) {}

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.baseUrl);
  }
}

