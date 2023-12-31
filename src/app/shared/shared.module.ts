import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule } from '@angular/material/select';
import {MatIconModule } from '@angular/material/icon';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
   MatCardModule,
     MatButtonModule,
     MatDialogModule,
     MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
      MatSelectModule,
      MatIconModule,
      MatTableModule,
      MatStepperModule,
     MatSidenavModule,
    MatMenuModule,
     MatGridListModule,
     MatToolbarModule,
     MatDatepickerModule,
     MatNativeDateModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    MatCardModule,
   MatButtonModule,
   MatDialogModule,
   MatFormFieldModule,
   MatInputModule,
    ReactiveFormsModule,
   MatSelectModule,
    FormsModule,
    MatIconModule,
    MatTable,
    MatStepperModule,
  MatSidenavModule,
   MatMenuModule,
   MatGridListModule,
   MatToolbarModule,
   MatDatepickerModule,
   MatNativeDateModule,
  ]
})
export class SharedModule { }
