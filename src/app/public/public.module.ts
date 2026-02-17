// src/app/public/public.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { FirstPageComponent } from './first-page/first-page.component';
import { AboutComponent } from './about/about.component';
import { MembershipPlansComponent } from './membership-plans/membership-plans.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    FirstPageComponent,
    AboutComponent,
    MembershipPlansComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
