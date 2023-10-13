import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharitiesComponent } from './charities/charities.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { DonationsComponent } from './donations/donations.component';
import { ProfileComponent } from './profile/profile.component';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [

  {path:'Charities', component:CharitiesComponent},

  {path:'Testimonial', component:TestimonialComponent},

  {path:'Donations', component:DonationsComponent},

  {path:'Profile', component:ProfileComponent},
  
  {path:'Issues', component:IssuesComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonarRoutingModule { }
