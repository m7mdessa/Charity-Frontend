import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { TestimonialService } from 'src/app/service/testimonial.service';
import { ToastrService } from 'ngx-toastr'; 
import { PagesService } from '../service/pages.service';
import { CharitiesService } from '../service/charities.service';
import { Router } from '@angular/router';
import  Swiper from 'swiper';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';

import * as Aos from 'aos';
Swiper.use([Autoplay]);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit  {

  acceptedTestimonials: any[] = [];
  currentPage = 1;
  testimonialsPerPage = 3;
  totalPages: number=0; 

  home : any[]=[];
  title:any = 'home'
  charities: any[]=[];
  acceptedCharities: any[] =[];
  currentCharityPage = 1;
  CharitiesPerPage = 3;
  totalCharityPages: number=0;
  private swiper!: Swiper;
  constructor(private router: Router, private testimonialService: TestimonialService,private toastr: ToastrService, private pageService:PagesService, private charityService:CharitiesService) { }

  ngOnInit(): void {
    this.loadAcceptedTestimonials();
    this.loadAcceptedCharities();
    this.initSwiper();

    this.getHome();
    Aos.init({disable: 'mobile'});
    Aos.refresh();
  }

  loadAcceptedTestimonials() {
    this.testimonialService.getAcceptedTestimonials().subscribe(
      (testimonials) => {
        this.acceptedTestimonials = testimonials;
        this.totalPages = Math.ceil(testimonials.length / this.testimonialsPerPage);
      },
      (error) => {
        console.error('Error loading accepted testimonials:', error);
      }
    );
  }
  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
  }

  nextPage() {
    const totalPages = Math.ceil(this.acceptedTestimonials.length / this.testimonialsPerPage);
    this.currentPage = Math.min(this.currentPage + 1, totalPages);
  }

  get displayedTestimonials() {
    const startIndex = (this.currentPage - 1) * this.testimonialsPerPage;
    const endIndex = startIndex + this.testimonialsPerPage;
    return this.acceptedTestimonials.slice(startIndex, endIndex);
  }


  formatShortDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
  
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }


  loadAcceptedCharities() {
    this.charityService.getAcceptedCharities().subscribe(
      (charities) => {
        this.acceptedCharities = charities;
        this.totalCharityPages = Math.ceil(charities.length / this.CharitiesPerPage);
      },
      (error) => {
        console.error('Error loading accepted charities:', error);
      }
    );
  }

  prevCharityPage() {
    this.currentCharityPage = Math.max(this.currentCharityPage - 1, 1);
  }

  nextCharityPage() {
    const totalCharityPages = Math.ceil(this.acceptedCharities.length / this.CharitiesPerPage);
    this.currentCharityPage = Math.min(this.currentCharityPage + 1, totalCharityPages);
  }

  get displayedCharities() {
    const startIndex = (this.currentCharityPage - 1) * this.CharitiesPerPage;
    const endIndex = startIndex + this.CharitiesPerPage;
    return this.acceptedCharities.slice(startIndex, endIndex);
  }

  getHome() {
    this.pageService.getPage(this.title).subscribe((home) => {
      this.home = home;
    });

  }
  toLogin(){
    this.router.navigate(['auth/login']);
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
