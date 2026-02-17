// src/app/member/account/account.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UserMyAccountResponse } from 'src/app/shared/models/responses/user-myaccount-response.model';
import { BodyMeasurement } from '../models/responses/body-measurement-response.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: UserMyAccountResponse | null = null;

  measurements: BodyMeasurement[] = [];
  filteredMeasurements: BodyMeasurement[] = [];
  availableMonths: string[] = [];

  selectedMonthYear: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
  // Hesap bilgisi
  this.accountService.getCurrentUser().subscribe({
    next: (data) => {
      this.user = data;
    },
    error: (err) => {
      console.error('Failed to fetch user info:', err);
    }
  });

  // Ölçümleri getir
  this.accountService.getMyBodyMeasurements().subscribe({
    next: (data) => {
      this.measurements = data;

      // Ay/yıl dropdown için liste oluştur
      const monthSet = new Set(
        data.map(m => m.createdTime.slice(0, 7))
      );
      this.availableMonths = Array.from(monthSet).sort().reverse();

      // 👇 En güncel ayı varsayılan olarak seç ve filtrele
      if (this.availableMonths.length > 0) {
        this.selectedMonthYear = this.availableMonths[0];
        this.filterMeasurementsByMonth();
      }
    },
    error: (err) => {
      console.error('Failed to fetch body measurements:', err);
    }
  });
}

  navigateToChangePassword(): void {
    this.router.navigate(['/login/change-password']);
  }

  filterMeasurementsByMonth(): void {
  if (!this.selectedMonthYear) {
    this.filteredMeasurements = [];
    return;
  }

  // Ay filtresine uyan tüm ölçümleri al
  const sameMonthMeasurements = this.measurements
    .filter(m => m.createdTime.startsWith(this.selectedMonthYear))
    .sort((a, b) => b.createdTime.localeCompare(a.createdTime)); // Yeniden eskiye sırala

  // Sadece en güncel olanı al
  this.filteredMeasurements = sameMonthMeasurements.length > 0
    ? [sameMonthMeasurements[0]]
    : [];
}
}