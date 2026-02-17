import { Component } from '@angular/core';
import { ChangePasswordRequest } from './change-password-request.model';
import { AccountService } from '../../admin/services/account.service';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordData: ChangePasswordRequest = {
    currentPassword: '',
    newPassword: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    this.accountService.changePassword(this.changePasswordData).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully!';
        this.errorMessage = '';
        this.changePasswordData = { currentPassword: '', newPassword: '' };
      },
      error: () => {
        this.errorMessage = 'Failed to change password. Please try again.';
        this.successMessage = '';
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}