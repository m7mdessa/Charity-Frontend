import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonarRoutingModule } from './donar-routing.module';
import { DonationsComponent } from './donations/donations.component';
import { ProfileComponent } from './profile/profile.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { IssuesComponent } from './issues/issues.component';
import { CharitiesComponent } from './charities/charities.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DonationsComponent,
    ProfileComponent,
    TestimonialComponent,
    IssuesComponent,
    CharitiesComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DonarRoutingModule,
    SharedModule
  ]
})
export class DonarModule { }
