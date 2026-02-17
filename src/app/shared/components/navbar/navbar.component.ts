import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.role$.subscribe(updatedRole => {
      this.role = updatedRole;
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/'; // sayfayı yenile
  }

  getHomeLink(): string {
    switch (this.role) {
      case 'ADMIN':
        return '/admin/home';
      case 'TRAINER':
        return '/trainer/home';
      case 'MEMBER':
        return '/member/home';
      default:
        return '/home'; // anonim kullanıcı
    }
  }
}