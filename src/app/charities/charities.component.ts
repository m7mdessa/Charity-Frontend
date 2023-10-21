import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../service/categories.service';
import { CharitiesService } from '../service/charities.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.css']
})

export class CharitiesComponent implements OnInit  {
  @ViewChild('callDonateDialog') callDonateDialog! :TemplateRef<any>
  donationForm: FormGroup | undefined;
  totallPrice:any=50
  CharityByCategory: any[] = [];
  charities: any[] = [];
  categories: any[] = [];
  acceptedCharities: any[] =[];
  filteredCharities: any[] = [];
  @Input() charityId: any;
    userId: any;
  _filterText:string='';
  constructor(private router: Router,  private userService: UserService,private toastr: ToastrService,private charitiesService:CharitiesService,private categoriesService:CategoriesService, public dialog: MatDialog) { 

    
  }
 
  ngOnInit(): void {
    this.loadAcceptedCharities();
    this.getCategories();
  
    this.payForm.get('userid')?.setValue(this.userId);

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
          this.userService.donateForCharity(userId,charityId,this.totallPrice,this.payForm.value).subscribe((_res:any) => {
            console.log('Charity payed successfully!');
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
      cardholdernumber: new FormControl(),
    cardnumber: new FormControl(),
    expirationdate: new FormControl(),
    cvv: new FormControl()

   });
 
  loadAcceptedCharities() {
    this.charitiesService.getAcceptedCharities().subscribe(
      (charities) => {
        this.acceptedCharities = charities;
      },
      (error) => {
        console.error('Error loading accepted charities:', error);
      }
    );
  }

 
  get displayedCharities() {
 
    return this.acceptedCharities;
  }
}
