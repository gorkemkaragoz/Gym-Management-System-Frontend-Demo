// src/app/member/member-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InboxComponent } from './inbox/inbox.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { TrainersComponent } from './trainers/trainers.component';
import { HealthyBarMenuComponent } from 'src/app/shared/components/healthy-bar-menu/healthy-bar-menu.component';
import { MenuItemComponent } from 'src/app/shared/components/healthy-bar-menu/menu-item/menu-item.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TrainerDetailComponent } from './trainers/trainer-detail/trainer-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'MEMBER' }
  },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'MEMBER' }
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'MEMBER' }
  },
  {
    path: 'trainers',
    component: TrainersComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'MEMBER' }
  },
  {
  path: 'trainers/:id',
  component: TrainerDetailComponent,
  canActivate: [AuthGuard],
  data: { expectedRole: 'MEMBER' }
 },
  {
    path: 'healthy-bar',
    component: HealthyBarMenuComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'MEMBER' }
  },
  {
    path: 'healthy-bar/:id',
    component: MenuItemComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'MEMBER' }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
