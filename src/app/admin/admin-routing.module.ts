import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonationsComponent } from './donations/donations.component';
import { CategoriesComponent } from './categories/categories.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { IssuesComponent } from './issues/issues.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CharitiesComponent } from './charities/charities.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {path:'users', component:UsersComponent},

  {path:'profile', component:ProfileComponent},

  {path:'', component:DashboardComponent},

  {path:'donations',component:DonationsComponent},

  {path:'categories',component:CategoriesComponent},

  {path:'testimonials',component:TestimonialsComponent},

  {path:'issues',component:IssuesComponent},

  {path:'charities',component:CharitiesComponent},

  {path:'pages',component:PagesComponent},

  {path:'contacts',component:ContactsComponent},



];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
