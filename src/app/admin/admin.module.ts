import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { CharitiesComponent } from './charities/charities.component';
import { IssuesComponent } from './issues/issues.component';
import { CategoriesComponent } from './categories/categories.component';
import { DonationsComponent } from './donations/donations.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactsComponent } from './contacts/contacts.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    PagesComponent,
    ProfileComponent,
    UsersComponent,
    CharitiesComponent,
    IssuesComponent,
    CategoriesComponent,
    DonationsComponent,
    TestimonialsComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule

  ]
})
export class AdminModule { }
