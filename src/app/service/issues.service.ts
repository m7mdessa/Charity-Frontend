import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) { }

  getIssues(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Issue');
  }

  getIssue(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7084/api/Issue/GetIssueById/'+id);
  }

  addIssue(issue: any): Observable<any> {
    return this.http.post<any>('https://localhost:7084/api/Issue/', issue);
  }

  updateIssue(issue: any): Observable<any> {
    return this.http.put('https://localhost:7084/api/Issue/UpdateIssue/',issue);
  }

  deleteIssue(id:number): Observable<any> {
    return this.http.delete('https://localhost:7084/api/Issue/Delete/'+id);
  }
}
