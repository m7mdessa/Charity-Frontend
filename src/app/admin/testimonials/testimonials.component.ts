import { Component, OnInit} from '@angular/core';
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
  form!: FormGroup;
  edit!: FormGroup;
  selectedTestimonial: any | null = null;
  selectedEditTestimonial: any | null = null;
  showAddTestimonialModal: boolean = false;
  response: any;
  id: any;
  selectedTestimonialForAction: any | null = null;

  acceptTestimonial(testimonial: any) {
    testimonial.status = 'Accepted';
    this.updateTestimonial(testimonial);
  }
  
  rejectTestimonial(testimonial: any) {
    testimonial.status = 'Rejected';
    this.updateTestimonial(testimonial);
  }
  getStatusBadgeClass(status: string): string {
    if (status === 'Pending') {
      return 'status-pending';
    } else if (status === 'Accepted') {
      return 'status-accepted';
    } else if (status === 'Rejected') {
      return 'status-rejected';
    }
    return ''; // Default class if status doesn't match any case
  }
  updateTestimonial(testimonial: any) {
    this.testimonialService.updateTestimonial(testimonial).subscribe(
      (response) => {
        console.log('Status updated successfully:', response);
        this.toastr.success('Status updated successfully.', 'Success');
        this.getTestimonials();
        this.closeModal();
      },
      (error) => {
        console.log('Error while updating status:', error);
        this.toastr.error('Error while updating status.', 'Error');
      }
    );
  }
  constructor(
    private testimonialService: TestimonialService,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.getTestimonials();

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      testimonial: new FormControl('',[Validators.required]),
    });
    this.edit = new FormGroup({
      id: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])

    });

  }
  
  getTestimonials() {
    this.testimonialService.getTestimonials().subscribe((testimonials) => {
      this.testimonials = testimonials;
    });
  }

  

  detailModal(_action: string, testimonial: any) {
    this.selectedTestimonial = testimonial;
    
  }
  

  addModal() {
    this.showAddTestimonialModal = true;

  }
  closeModal() {
    this.selectedTestimonial = null;
    this.selectedEditTestimonial = null;
    this.showAddTestimonialModal = false;
    this.form = new FormGroup({
      testimonial: new FormControl(''),
      username: new FormControl(''),
      status: new FormControl(''),
      date: new FormControl('')

    });
     this.edit = new FormGroup({
      id: new FormControl('', [Validators.required]),

      status: new FormControl('', [Validators.required])

    });
  }

  deleteTestimonial(id: number) {
    console.log('Deleting Testimonial with ID:', id);
  
    this.testimonialService.deleteTestimonial(id).subscribe(
      () => {
        this.testimonials = this.testimonials.filter((testimonials) => testimonials.id !== id);
        console.log('User deleted successfully.');
        this.closeModal();  

      },
      (error) => {
        console.log('Error while deleting user:', error);
      }
    );
  }
  get f(){
    return this.form.controls;
  }
  openAddTestimonialModal() {
    this.showAddTestimonialModal = true;
  }


  addTestimonial(){
    console.log(this.form.value);
    this.testimonialService.addTestimonial(this.form.value).subscribe((_res:any) => {
         console.log('Testimonial created successfully!');
         this.toastr.success('Testimonial added successfully.', 'Success');
         this.getTestimonials(); 

         this.closeModal();  
          })
  }

}
