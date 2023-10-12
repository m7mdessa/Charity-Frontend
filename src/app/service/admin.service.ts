import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  [x: string]: any;
  constructor(private http: HttpClient) {}

  updateAdmin(admin: any): Observable<any> {
    return this.http.put<any>('https://localhost:7084/api/Admin/UpdateAdmin', admin);
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>('https://localhost:7084/api/Admin/NumberOfUsers');
  }
  getNumberOfCharities(): Observable<number> {
    return this.http.get<number>('https://localhost:7084/api/Admin/NumberOfCharitis');
  }
  GetNumberOfNotifications(): Observable<number> {
    return this.http.get<number>('https://localhost:7084/api/Admin/NumberOffNotifications');
  }
  getMaxCharityCategory(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Admin/MaxCharityCategory');
  }

  searchBetweenDates(sareach: any): Observable<any[]> {
    return this.http.post<any[]>(`https://localhost:7084/api/Admin/SerchBetweenDates`, sareach);
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Admin/Reports');
  }

  GetAllNotifications(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Admin/GetAllNotifications');
  }
  GetAllDonations(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Admin/GetAllDonations');
  }
  
  getBenefits(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7084/api/Admin/Benefits');
  }

  getReportsInterval(startDate: Date, endDate: Date): Observable<any> {
    return this.http.post('https://localhost:7084/api/Admin/ReportsInterval', { startDate, endDate });
  }
  
}
