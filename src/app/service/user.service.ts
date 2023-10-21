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
    return this.http.put<void>('https://localhost:7091/api/Donar', charity);
  }
  updateUser(user: any): Observable<void> {
    user.image = this.upload_Image;

    return this.http.put<void>('https://localhost:7091/api/Donar/UpdateUser', user);
  }
  getCharityByUserId(userId: any): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Donar/getCharityByUserId/'+userId);
  }

 
 
  deleteCharityByUserId(id:number): Observable<any> {
    return this.http.delete('https://localhost:7091/api/Donar/deleteCharityByUserId/'+id);
  }


  getIssueByUserId(userId: any): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Donar/GetIssueByUserId/'+userId);
  }

  addIssue(issue: any): Observable<void> {
    return this.http.post<void>('https://localhost:7091/api/Donar/CreateIssue', issue);
  }

  getCharityByName(search: any): Observable<any[]> {
    return this.http.post<any[]>('https://localhost:7091/api/Donar/GetCharityByName', search);
  }

  addCharity(charity: any): Observable<void> {
    charity.image = this.upload_Image;

    return this.http.post<void>('https://localhost:7091/api/Donar/CreateCharity', charity);
  }

  updateCharityDetails(charity: any): Observable<void> {
    return this.http.put<void>('https://localhost:7091/api/Donar/UpdateCharity', charity);
  }

  payForCharity(userId: any, charityId: any,payment: any): Observable<void> {
    return this.http.post<void>('https://localhost:7091/api/Donar/PayForCharity/'  + userId + '/' + charityId, payment);
  }

  donateForCharity(userId: any, charityId: any,totalPrice:any, payment: any): Observable<void> {
    return this.http.post<void>('https://localhost:7091/api/Donar/DonateForCharity/' + userId + '/' + charityId+'/' + totalPrice, payment);
  }

  getDonationByUserId(userId: any): Observable<any>{
    return this.http.get('https://localhost:7091/api/Donar/GetDonationByUserId/' + userId);
  }

 
  uploadAttachment(file:FormData){
    this.http.post('https://localhost:7091/api/Donar/uploadImage' ,file).subscribe((resp:any)=>{
    this.upload_Image = resp.image; 
    },err=>{
      console.log('Something went wrong !!');
    })
  
  }
  
}
