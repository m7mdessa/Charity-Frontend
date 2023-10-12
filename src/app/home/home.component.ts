import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import Swiper from 'swiper';
import { Navigation, Lazy,Autoplay } from 'swiper/modules';
Swiper.use([Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  swiper: Swiper | undefined;

  ngOnInit(): void {
    this.initSwiper();
  }
  private initSwiper(): void {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 20,
 
      loop: true,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
