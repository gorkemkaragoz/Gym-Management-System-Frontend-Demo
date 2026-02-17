// src/app/auth/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import { Router }    from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  model = {
    tckn: '',
    email: ''
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    console.log('Şifre yenileme formu:', this.model);
    // TODO: servise istek at, mail gönderme akışı vs.
    // Başarılıysa change-password sayfasına yönlendir:
    this.router.navigate(['/login/change-password']);
  }
}
