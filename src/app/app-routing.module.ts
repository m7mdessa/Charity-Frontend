import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DonarModule } from './donar/donar.module';
import { CharitiesComponent } from './charities/charities.component';
import { AutherizationGuard } from './autherization.guard';

const routes: Routes = [

  {path:'admin', loadChildren:()=>AdminModule, canActivate:[AutherizationGuard]},

  {path:'user', loadChildren:()=>DonarModule, canActivate:[AutherizationGuard]},

  {path:'auth', loadChildren:()=>AuthModule},

  { path:'',  component:HomeComponent},

  { path:'contact', component:ContactComponent},

  { path:'about',component:AboutComponent},

  { path:'Charities',component:CharitiesComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
