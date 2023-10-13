import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  upload_Image: any;

  constructor(private http: HttpClient) { }

  getAbouts(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/About');
  }
  addAbout(About: any): Observable<any>{
    About.background = this.upload_Image;

    return  this.http.post('https://localhost:7084/api/About',About);
 
  }
  updateAbout(About: any): Observable<any> {
    About.background = this.upload_Image;

    return this.http.put('https://localhost:7084/api/About/',About);

  }
  deleteAbout(id:number): Observable<any> {
    return this.http.delete('https://localhost:7084/api/About/Delete/'+id);
  }

  uploadAttachment(file:FormData){
    this.http.post('https://localhost:7084/api/About/uploadImage' ,file).subscribe((resp:any)=>{
    this.upload_Image = resp.background; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }





}
