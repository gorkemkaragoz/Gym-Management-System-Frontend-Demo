import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { MenuItem } from 'src/app/shared/models/common/menu-item.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-healthy-bar-menu',
  templateUrl: './healthy-bar-menu.component.html',
  styleUrls: ['./healthy-bar-menu.component.css']
})
export class HealthyBarMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  userRole: string = ''; // 'member' veya 'trainer'

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Rolü al ve küçük harfe çevir ('MEMBER' → 'member')
    const role = this.authService.getRole();
    if (role) {
      this.userRole = role.toLowerCase();
    }

    // Menü verisini çek
    this.menuService.getMenuItems().subscribe({
      next: (data) => this.menuItems = data,
      error: (err) => console.error('Healthy Bar Menu verileri alınamadı:', err)
    });
  }

  getImagePath(productName: string): string {
    return `assets/menu-images/${productName}.jpg`;
  }
}