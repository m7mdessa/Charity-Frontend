import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DonarModule } from './donar/donar.module';
const routes: Routes = [

  {path:'admin', loadChildren:()=>AdminModule},

  {path:'user', loadChildren:()=>DonarModule},

  {path:'auth', loadChildren:()=>AuthModule},

  { path:'',  component:HomeComponent},

  { path:'contact', component:ContactComponent},

  { path:'about',component:AboutComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
