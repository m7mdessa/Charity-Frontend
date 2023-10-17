import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userTokenData: any = null;
  upload_Image: any;

  constructor(private http: HttpClient) {}

  setUserTokenData(data: any) {
    this.userTokenData = data;
  }

  getUserTokenData(): any {
    return this.userTokenData;
  }
  getUser(id: any): Observable<any> {
    return this.http.get<any>('https://localhost:7091/api/Donar/GetUserById/'+id);
  }
  updateCharity(charity: any): Observable<void> {
    return this.http.put<void>('https://localhost:7091/api/User', charity);
  }
  updateUser(user: any): Observable<void> {
    return this.http.put<void>('https://localhost:7091/api/User/UpdateUser', user);
  }
  getCharityByUserId(userId: any): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/User/getCharityByUserId/'+userId);
  }

 
 
  deleteCharityByUserId(id:number): Observable<any> {
    return this.http.delete('https://localhost:7091/api/User/deleteCharityByUserId/'+id);
  }

  addTestimonial(testimonial: any): Observable<void> {
    return this.http.post<void>('https://localhost:7091/api/User/CreateTestimonial', testimonial);
  }

  getTestimonialByUserId(userId: any): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/User/GetTestimonialByUserId/'+userId);
  }

  getIssueByUserId(userId: any): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/User/GetIssueByUserId/'+userId);
  }

  addIssue(issue: any): Observable<void> {
    return this.http.post<void>('https://localhost:7091/api/User/CreateIssue', issue);
  }

  getCharityByName(search: any): Observable<any[]> {
    return this.http.post<any[]>('https://localhost:7091/api/User/GetCharityByName', search);
  }

  addCharity(charity: any): Observable<void> {
    charity.image = this.upload_Image;

    return this.http.post<void>('https://localhost:7091/api/User/CreateCharity', charity);
  }

  updateCharityDetails(charity: any): Observable<void> {
    return this.http.put<void>('https://localhost:7091/api/User/UpdateCharity', charity);
  }

  payForCharity(userId: any, payment: any): Observable<void> {
    return this.http.post<void>('https://localhost:7091/api/User/PayForCharity/' + userId, payment);
  }

  donateForCharity(userId: any, charityId: any, payment: any): Observable<void> {
    return this.http.post<void>('https://localhost:7091/api/User/DonateForCharity/' + userId + '/' + charityId, payment);
  }

  getDonationByUserId(userId: any): Observable<any>{
    return this.http.get('https://localhost:7091/api/User/GetDonationByUserId/' + userId);
  }

 
  uploadAttachment(file:FormData){
    this.http.post('https://localhost:7091/api/User/uploadImage' ,file).subscribe((resp:any)=>{
    this.upload_Image = resp.image; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }
  
}
