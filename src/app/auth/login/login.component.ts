// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    this.http.post<any>('http://localhost:8080/api/v1/auth/login', this.model)
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.authService.saveRole(res.role);

          // Rol bilgisine göre yönlendirme
          switch (res.role) {
            case 'ADMIN':
              this.router.navigate(['/admin/home']);
              break;
            case 'TRAINER':
              this.router.navigate(['/trainer/home']);
              break;
            case 'MEMBER':
              this.router.navigate(['/member/home']);
              break;
            default:
              this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          alert('Login failed!');
          console.error(err);
        }
      });
  }

  onForgot(): void {
    this.router.navigate(['/login/forgot-password']);
  }
}
