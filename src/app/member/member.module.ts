// src/app/member/member.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { SharedModule } from '../shared/shared.module';

import { InboxComponent } from './inbox/inbox.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainerDetailComponent } from './trainers/trainer-detail/trainer-detail.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InboxComponent,
    TrainersComponent,
    TrainerDetailComponent,
    AccountComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule,
    FormsModule
  ],
})
export class MemberModule { }
