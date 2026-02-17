// src/app/admin/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { UserManagementResponse } from '../models/responses/user-management-response'; // Kullanıcı modelini import edin
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalMembers: number = 0;
  totalTrainers: number = 0;
  isLoading: boolean = true; // Veriler yüklenirken spinner göstermek için

  constructor(private userService: UserManagementService) { }

  ngOnInit(): void {
    this.loadUserCounts();
  }

  loadUserCounts(): void {
    this.isLoading = true;
    this.userService.getAllUsers().pipe(
      map((users: UserManagementResponse[]) => {
        // Gelen tüm kullanıcıları Member ve Trainer olarak ayırıp sayılarını bul
        this.totalMembers = users.filter(user => user.roleName === 'MEMBER').length;
        this.totalTrainers = users.filter(user => user.roleName === 'TRAINER').length;
      }),
      catchError(error => {
        console.error('Kullanıcı sayıları alınırken bir hata oluştu:', error);
        // Hata durumunda sayıları sıfır olarak ayarla veya kullanıcıya bilgi ver
        this.totalMembers = 0;
        this.totalTrainers = 0;
        return throwError(() => new Error('Kullanıcı sayıları yüklenemedi.'));
      })
    ).subscribe(() => {
      this.isLoading = false; // Yükleme bitti
    });
  }
}