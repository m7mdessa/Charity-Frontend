
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { CharitiesService } from 'src/app/service/charities.service';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.css']
})
export class CharitiesComponent implements OnInit {
    charities: any[] = [];
    edit!: FormGroup;

  display_image: any;
  upload_Image: any;

  filteredCharities: any[] = [];

    constructor( private cdr: ChangeDetectorRef,  private charitiesService: CharitiesService, private adminService:AdminService, private toastr: ToastrService) {
 }
    form :FormGroup = new FormGroup({
      charityname: new FormControl(''),
      image: new FormControl()
    });
 
    ngOnInit(): void {
      this.getcharities();
   
    
    }
  
    getcharities() {
      this.charitiesService.getCharities().subscribe((charities) => {
        this.charities = charities;
      });
  
    }
    
    addCharity() {

      this.charitiesService.addCharity(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Charity Added successfully.', 'Success');
        this.getcharities();
      },err=>{
        
        this.toastr.error('Something went wrong !!', 'error');
  
      });
    }
    searchBetweenDates(dateFrom: string, dateTo: string) {
      this.adminService.searchBetweenDates(dateFrom, dateTo).subscribe(
        (resp: any) => {
          this.toastr.success('Charity Added successfully.', 'Success');
        },
        (err) => {
          this.toastr.error('Something went wrong !!', 'Error');
        }
      );
    }
    
    
 
    
    
   

    UploadImage(file:any)
    {
    if(file.length==0)
    return ; 
    let fileToUpload=<File>file[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.charitiesService.uploadAttachment(formDate);
    }
 
    
 
    deleteCharity(id: number) {
      console.log('Deleting Charity with ID:', id);
    
      this.charitiesService.deleteCharity(id).subscribe(
        () => {
          this.charities = this.charities.filter((Charity) => Charity.id !== id);
          console.log('Charity deleted successfully.');
  
        },
        (error) => {
          console.log('Error while deleting Charity:', error);
        }
      );
    }
  
    AcceptForm : FormGroup = new FormGroup({
      id: new FormControl(''),
      price: new FormControl(40),
      status: new FormControl(''),
      
     });
     
     updateStatus(status: string, Charity: any) {
      this.AcceptForm.get('status')?.setValue(status);
      this.AcceptForm.get('id')?.setValue(Charity.id);

      // Use setTimeout to trigger change detection outside the current cycle
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    }
  
    AcceptCharity(Charity: any) {
      this.adminService.AcceptCharity(this.AcceptForm.value).subscribe(
        (response) => {
          console.log( this.AcceptForm.value);
  
          console.log('Charity updated successfully:', response);
          this.toastr.success('Charity updated successfully.', 'Success');
          this.getcharities(); 
  
        
        },
        (error) => {
          console.log( this.AcceptForm.value);
  
          console.log('Error while update Charity:', error);
            this.toastr.error('Error while update Charity.', 'Error'); 
  
        }
      );
    }
  
  }
  

