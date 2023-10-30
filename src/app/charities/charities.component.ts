import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../service/categories.service';
import { CharitiesService } from '../service/charities.service';
import { UserService } from '../service/user.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.css']
})

export class CharitiesComponent implements OnInit  {
  @ViewChild('callDonateDialog') callDonateDialog! :TemplateRef<any>
  donationForm: FormGroup | undefined;
  selectedValue: number | null = null;
  Amounts: number[] = [40, 50, 60, 100,110];

  onSelectChange(event: any) {
     this.selectedValue = event.target.value;
    console.log('Selected Value:', this.selectedValue);
  } 
  
  CharityByCategory: any[] = [];
  charities: any[] = [];
  categories: any[] = [];
  acceptedCharities: any[] =[];
  filteredCharities: any[] = [];
  @Input() charityId: any;
    userId: any;
  _filterText:string='';
  progressValue: any;
  totalDonation: number = 10;
  totalprice: any// Replace 1000 with your actual total price
currentPrice: number = 0;

showSearchForm: boolean = false;

toggleSearchForm() {
  this.showSearchForm = !this.showSearchForm;
}
  constructor(private router: Router,  private userService: UserService,private toastr: ToastrService,private charitiesService:CharitiesService,private categoriesService:CategoriesService, public dialog: MatDialog) { 

    
  }
 
  ngOnInit(): void {
    this.loadAcceptedCharities();
    this.getCategories();
    this.getcharities();

  }


  
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

  }

  GetCharityByCategory(categoryId:any) {
    this.charitiesService.GetCharityByCategory(categoryId).subscribe((CharityByCategory) => {
      this.CharityByCategory = CharityByCategory;
    });

  }

  

  OpenDonateDialog(charityId: any) {
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    
    console.log(charityId,userId)

    const dialogRef= this.dialog.open(this.callDonateDialog);

    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          
          this.userService.donateForCharity(userId,charityId,this.payForm.value).subscribe((_res:any) => {
            console.log('Charity payed successfully!');
            console.log(userId,charityId,this.payForm.value);

            this.toastr.success('Charity payed successfully.', 'Success');
            this.loadAcceptedCharities(); 
            this.dialog.closeAll();
            this.payForm.reset();
   
       }) 
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

  payForm : FormGroup = new FormGroup({
    totalprice: new FormControl(),
    cardholdernumber: new FormControl(),
    cardnumber: new FormControl(),
    expirationdate: new FormControl(),
    cvv: new FormControl()

   });
 
  loadAcceptedCharities() {
    
    this.charitiesService.getAcceptedCharities().subscribe(
      (charities: any[]) => {
        this.acceptedCharities = charities;
    
      },
      (error) => {
        console.error('Error loading accepted charities:', error);
      }
    );
  }
  getcharities() {
    return this.charitiesService.getCharities().pipe(
      map((charities: any[]) => {
        return charities.reduce(( charity) => charity.totalprice);
      })
    );
  }
 

  get displayedCharities() {
 
    return this.acceptedCharities;
  }
}
