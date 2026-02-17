// src/app/public/public-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { AboutComponent } from './about/about.component';
import { MembershipPlansComponent } from './membership-plans/membership-plans.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '',       component: FirstPageComponent, pathMatch: 'full' },
  { path: 'about',  component: AboutComponent },
  { path: 'plans',  component: MembershipPlansComponent },
  { path: 'contact',component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
