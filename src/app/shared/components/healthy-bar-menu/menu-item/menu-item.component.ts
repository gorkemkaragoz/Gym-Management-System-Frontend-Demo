import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { MenuItem } from 'src/app/shared/models/common/menu-item.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  item: MenuItem | null = null;
  role: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private authService: AuthService
  ) {}

 ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.menuService.getMenuItemById(id).subscribe({
        next: (data) => this.item = data,
        error: (err) => console.error('Ürün getirilemedi:', err)
      });
    }

    this.role = this.authService.getRole();
  }

  getImagePath(productName: string): string {
    return `assets/menu-images/${productName}.jpg`;
  }
}
