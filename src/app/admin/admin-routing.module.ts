import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { AccountComponent } from './account/account.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { LessonSchedulerComponent } from './lesson-scheduler/lesson-scheduler.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'users',
    component: ManageUsersComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'lessons',
    component: LessonSchedulerComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ADMIN' }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
