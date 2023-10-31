import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Users');
  }

  getUser(id: any): Observable<any> {
    return this.http.get<any>('https://localhost:7091/api/Users/GetUserById/'+id);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>('https://localhost:7091/api/Users/addUser/', user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put('https://localhost:7091/api/Users/',user);
  }

  deleteUser(id:number): Observable<any> {
    return this.http.delete('https://localhost:7091/api/Users/Delete/'+id);
  }
}
