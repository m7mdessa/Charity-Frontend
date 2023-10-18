import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl } from '@angular/forms';   
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import  Swiper from 'swiper';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';

import * as Aos from 'aos';
import { TestimonialService } from 'src/app/service/testimonial.service';
Swiper.use([Autoplay]);

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  profile: any[] = [];

  testimonials: any[] = [];
  userTokenData: any;
  userId: string = '';
  private swiper!: Swiper;

  constructor(private testimonialService: TestimonialService,private userService: UserService,private toastr: ToastrService,private dialog:MatDialog,private authService: AuthService) {

  }
  
  ngOnInit(): void {
    this.getTestimonials();
    this.getProfile();

    this.initSwiper();

    Aos.init({disable: 'mobile'});
    Aos.refresh();
   

  }


  CreateForm : FormGroup = new FormGroup({
    userid: new FormControl(),
    testimonial: new FormControl('')
   });


  OpenDialogTestimonial()
  {
  
  this.dialog.open(this.callCreateDialog);
  
  }
  getProfile() {
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.userService.getUser(userId).subscribe((profile) => {
      this.profile = profile;
      console.log('profile',profile);

    });
  }

  getTestimonials() {
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.testimonialService.getTestimonialByUserId(userId).subscribe((testimonials) => {
      this.testimonials = testimonials;
    });
  }

  
  addTestimonial(){
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    console.log(this.CreateForm.value);
    this.CreateForm.get('userid')?.setValue(userId);
    console.log(this.CreateForm.value);

    this.testimonialService.addTestimonial(this.CreateForm.value).subscribe((_res:any) => {
         console.log('Testimonial created successfully!');
         this.toastr.success('Testimonial added successfully.', 'Success');
         this.getTestimonials(); 
         this.dialog.closeAll();
         this.CreateForm.reset();

    })
  }
 
  private initSwiper(): void {
    this.swiper = new Swiper('.swiper-container', {
      // Swiper options here
      slidesPerView: 3,
      spaceBetween: 30,

      loop: true,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  goToPrevSlide() {
    this.swiper.slidePrev();
  }

  // Function to navigate to the next slide
  goToNextSlide() {
    this.swiper.slideNext();
  }


}


  

