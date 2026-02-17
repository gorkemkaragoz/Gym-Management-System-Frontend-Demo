import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { AccountComponent } from './account/account.component';
import { HealthyBarMenuComponent } from '../shared/components/healthy-bar-menu/healthy-bar-menu.component';
import { MenuItemComponent } from '../shared/components/healthy-bar-menu/menu-item/menu-item.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'TRAINER' }
  },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'TRAINER' }
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'TRAINER' }
  },
  {
      path: 'healthy-bar',
      component: HealthyBarMenuComponent,
      canActivate: [AuthGuard],
      data: { expectedRole: 'TRAINER' }
    },
    {
      path: 'healthy-bar/:id',
      component: MenuItemComponent,
      canActivate: [AuthGuard],
      data: { expectedRole: 'TRAINER' }
    },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule {}
