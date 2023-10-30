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
    return this.http.put<any>('https://localhost:7091/api/Admin/UpdateAdmin', admin);
  }
  AcceptCharity(charity: any): Observable<any> {
    return this.http.put<any>('https://localhost:7091/api/Admin/AcceptCharity', charity);
  }

  getNumberOfUsers(): Observable<number> {
    return this.http.get<number>('https://localhost:7091/api/Admin/NumberOfUsers');
  }
  getNumberOfCharities(): Observable<number> {
    return this.http.get<number>('https://localhost:7091/api/Admin/NumberOfCharitis');
  }
  GetNumberOfNotifications(): Observable<number> {
    return this.http.get<number>('https://localhost:7091/api/Admin/NumberOffNotifications');
  }
  getMaxCharityCategory(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Admin/MaxCharityCategory');
  }

  searchBetweenDates(dateFrom: string, dateTo: string): Observable<any[]> {
  
    const url = `https://localhost:7091/api/Admin/SearchBetweenDates/${dateFrom},${dateTo}`;
    return this.http.post<any[]>(url, null);
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Admin/Reports');
  }

  GetAllNotifications(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Admin/GetAllNotifications');
  }
  GetAllDonations(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Admin/GetAllDonations');
  }
  
  getBenefits(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Admin/Benefits');
  }

  getReportsInterval(startDate: Date, endDate: Date): Observable<any> {
    return this.http.post('https://localhost:7091/api/Admin/ReportsInterval', { startDate, endDate });
  }
  
}
