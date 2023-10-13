import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  upload_Image: any;
  upload_logo :any;

  constructor(private http: HttpClient) { }

  getHomes(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Home');
  }

  getHome(): Observable<any> {
    return this.http.get<any>('https://localhost:7084/api/Home');
  }


  addHome(Home: any): Observable<any>{
    Home.background = this.upload_Image;
    Home.logo = this.upload_logo;

    return  this.http.post('https://localhost:7084/api/Home',Home);
 
  }
  updateHome(Home: any): Observable<any> {
    Home.background = this.upload_Image;
    Home.logo = this.upload_logo;

    return this.http.put('https://localhost:7084/api/Home/',Home);

  }

  deleteHome(id:number): Observable<any> {
    return this.http.delete('https://localhost:7084/api/Home/Delete/'+id);
  }

  uploadAttachment(file:FormData){
    this.http.post('https://localhost:7084/api/Home/uploadImage' ,file).subscribe((resp:any)=>{
    this.upload_Image = resp.background; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }

  uploadLogo(file:FormData){
    this.http.post('https://localhost:7084/api/Home/uploadlogo' ,file).subscribe((resp:any)=>{
    this.upload_logo = resp.logo; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }

}
