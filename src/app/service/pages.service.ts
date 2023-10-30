
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  upload_Slide1: any;
  upload_Slide2: any;
  upload_Slide3: any;
  upload_logo :any;

  constructor(private http: HttpClient) { }

  getPages(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Pages');
  }

  getPage(title: any): Observable<any> {
    return this.http.get<any>('https://localhost:7091/api/Pages/GetPageByTitle/'+title);
  }


  addHomePage(homePage: any): Observable<any>{
    homePage.slide1 = this.upload_Slide1;
    homePage.slide2 = this.upload_Slide2;
    homePage.slide3 = this.upload_Slide3;
    homePage.logo = this.upload_logo;

    return  this.http.post('https://localhost:7091/api/Pages/homePage',homePage);
 
  }

  updateHomePage(homePage: any): Observable<any> {
    homePage.slide1 = this.upload_Slide1;
    homePage.slide2 = this.upload_Slide2;
    homePage.slide3 = this.upload_Slide3;
    homePage.logo = this.upload_logo;

    return this.http.put('https://localhost:7091/api/Pages/homePage/',homePage);

  }

  addAboutPage(aboutPage: any): Observable<any>{
    aboutPage.slide1 = this.upload_Slide1;

    return  this.http.post('https://localhost:7091/api/Pages/aboutPage/',aboutPage);
 
  }

  updateAboutPage(aboutPage: any): Observable<any> {
    aboutPage.slide1 = this.upload_Slide1;
    return this.http.put('https://localhost:7091/api/Pages/aboutPage/',aboutPage);

  }

  addContactPage(contactPage: any): Observable<any>{

    return  this.http.post('https://localhost:7091/api/Pages/contactPage',contactPage);
 
  }

  updateContactPage(contactPage: any): Observable<any> {
    return this.http.put('https://localhost:7091/api/Pages/contactPage',contactPage);

  }

  deletePage(id:number): Observable<any> {
    return this.http.delete('https://localhost:7091/api/Pages/Delete/'+id);
  }

  Slide1(file:FormData){
    this.http.post('https://localhost:7091/api/Pages/Slide1' ,file).subscribe((resp:any)=>{
    this.upload_Slide1 = resp.slide1; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }

  Slide2(file:FormData){
    this.http.post('https://localhost:7091/api/Pages/Slide2' ,file).subscribe((resp:any)=>{
    this.upload_Slide2 = resp.slide2; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }
  
  Slide3(file:FormData){
    this.http.post('https://localhost:7091/api/Pages/Slide3' ,file).subscribe((resp:any)=>{
    this.upload_Slide3 = resp.slide3; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }

  Logo(file:FormData){
    this.http.post('https://localhost:7091/api/Pages/Logo' ,file).subscribe((resp:any)=>{
    this.upload_logo = resp.logo; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }

}
