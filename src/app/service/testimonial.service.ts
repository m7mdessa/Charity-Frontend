import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: HttpClient) { }


  getTestimonials(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Testimonial');
  }

  getTestimonial(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7091/api/Testimonial/GetTestimonialById/'+id);
  }

  addTestimonial(testimonial: any): Observable<any> {
    return this.http.post<any>('https://localhost:7091/api/Testimonial/', testimonial);
  }


  updateTestimonial(testimonial: any): Observable<any> {
    return this.http.put('https://localhost:7091/api/Testimonial/', testimonial);
  }


  deleteTestimonial(id:number): Observable<any> {
    return this.http.delete('https://localhost:7091/api/Testimonial/Delete/'+id);
  }

  getTestimonialByUserId(userId: any): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7091/api/Testimonial/GetTestimonialByUserId/'+userId);
  }
  getAcceptedTestimonials(): Observable<any[]> {
    return this.getTestimonials().pipe(
      map(testimonials => testimonials.filter(testimonial => testimonial.status === 'Accepted'))
    );
  }
}
