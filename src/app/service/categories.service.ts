import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  upload_Image: any;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Category');
  }

  getCategory(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7084/api/Category/'+id);
  }


  addCategory(Category: any): Observable<any>{
    Category.image = this.upload_Image;

    return  this.http.post('https://localhost:7084/api/Category',Category);
 
  }
  updateCategory(Category: any): Observable<any> {
    Category.image = this.upload_Image;

    return this.http.put('https://localhost:7084/api/Category/',Category);

  }

  deleteCategory(id:number): Observable<any> {
    return this.http.delete('https://localhost:7084/api/Category/Delete/'+id);
  }

  uploadAttachment(file:FormData){
    this.http.post('https://localhost:7084/api/Category/uploadImage' ,file).subscribe((resp:any)=>{
    this.upload_Image = resp.image; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }
  
}
