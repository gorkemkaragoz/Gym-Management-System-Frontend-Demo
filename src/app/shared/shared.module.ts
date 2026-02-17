import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RoleBadgePipe } from './pipes/role-badge.pipe';
import { HealthyBarMenuComponent } from './components/healthy-bar-menu/healthy-bar-menu.component';
import { MenuItemComponent } from './components/healthy-bar-menu/menu-item/menu-item.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    RoleBadgePipe,
    HealthyBarMenuComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    RoleBadgePipe,
    HealthyBarMenuComponent, // ✅ Dışa aktaralım ki diğer modüllerde kullanılabilsin
    MenuItemComponent
  ]
})
export class SharedModule { }