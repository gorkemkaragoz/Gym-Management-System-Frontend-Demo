import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentsComponent } from './students/students.component';
import { InboxComponent } from './inbox/inbox.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ScheduleComponent,
    StudentsComponent,
    InboxComponent,
    AccountComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TrainerModule { }
