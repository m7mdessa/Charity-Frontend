import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Contact');
  }


  addContact(contact: any): Observable<any> {
    return this.http.post<any>('https://localhost:7084/api/Contact/', contact);
  }

  updateContact(contact: any): Observable<any> {
    return this.http.put('https://localhost:7084/api/Contact/',contact);
  }

  deleteContact(id:number): Observable<any> {
    return this.http.delete('https://localhost:7084/api/Contact/Delete/'+id);
  }
}
