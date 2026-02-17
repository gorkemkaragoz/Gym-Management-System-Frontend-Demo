// src/app/admin/account/account.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AdminMyAccountResponse } from '../models/responses/admin-myaccount-response.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: AdminMyAccountResponse | null = null;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Failed to fetch user info:', err);
      }
    });
  }

  navigateToChangePassword(): void {
    this.router.navigate(['/login/change-password']);
  }
}