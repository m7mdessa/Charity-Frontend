import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TestimonialService } from 'src/app/service/testimonial.service';
import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl,Validators } from '@angular/forms';   

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit{
  testimonials: any[] = [];
 

  constructor( private cdr: ChangeDetectorRef, private testimonialService: TestimonialService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTestimonials();

  
  }
  
  getTestimonials() {
    this.testimonialService.getTestimonials().subscribe((testimonials) => {
      this.testimonials = testimonials;
    });
  }

  AcceptForm : FormGroup = new FormGroup({
    id: new FormControl(''),
    status: new FormControl(''),
    
   });

updateStatus(status: string, Testimonial: any) {
      this.AcceptForm.get('status')?.setValue(status);
      this.AcceptForm.get('id')?.setValue(Testimonial.id);

      setTimeout(() => {
        this.cdr.detectChanges();
      });
    }
  

    AcceptCharity(Testimonial: any) {
      this.testimonialService.updateTestimonial(this.AcceptForm.value).subscribe(
        (response) => {
          console.log( this.AcceptForm.value);
  
          console.log('Testimonial updated successfully:', response);
          this.toastr.success('Testimonial updated successfully.', 'Success');
          this.getTestimonials();
  
        
        },
        (error) => {
          console.log( this.AcceptForm.value);
  
          console.log('Error while update Testimonial:', error);
            this.toastr.error('Error while update Testimonial.', 'Error'); 
  
        }
      );
    }
  


  

}
