
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  profile: any[] = [];
  userTokenData: any;
  userId: string = '';
  hide = true;
  hidee = true;
  focus: any;
  focus1: any;
  focus5: any;

  constructor( private userService: UsersService,private user: UserService,private toastr: ToastrService ) {}

  
  ngOnInit(): void {
    Aos.init({disable: 'mobile'});
    Aos.refresh();
    this.getProfile();

  }


  updateForm : FormGroup = new FormGroup({
    
    id: new FormControl(),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),


   });


 matchError() {
    if (this.updateForm.controls['password'].value === this.updateForm.controls['confirmPassword'].value) {
      this.updateForm.controls['confirmPassword'].setErrors(null);
    } else {
      this.updateForm.controls['confirmPassword'].setErrors({ misMatch: true });
    }
  }


   
  updateUser() {
    
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.updateForm.get('id')?.setValue(userId);
    this.user.updateUser(this.updateForm.value).subscribe(
      (responsee) => {
        console.log( this.updateForm.value);

        console.log('User updated successfully:', responsee);
        this.toastr.success('User updated successfully.', 'Success');
         this.updateForm.reset();

      
      },
      (error) => {
        console.log( this.updateForm.value);

        console.log('Error while update User :', error);
          this.toastr.error('Error while update User .', 'Error'); 

      }
    );
  }

  getProfile() {
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.user.getUser(userId).subscribe((profile) => {
      this.profile = profile;
      console.log('profile',profile);

    });
  }

  
 


}
