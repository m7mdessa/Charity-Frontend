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

  charities: any[] = [];
  categories: any[] = [];
  acceptedCharities: any[] =[];
  filteredCharities: any[] = [];

  @Input() charityId: any;
    userId: any;
    hideUserIdField: boolean = true; 
  userTokenData: any;
  _filterText:string='';
  constructor(private router: Router,  private userService: UserService,private toastr: ToastrService,private charitiesService:CharitiesService,private categoriesService:CategoriesService, public dialog: MatDialog) { 

    
  }
 
  ngOnInit(): void {
    this.loadAcceptedCharities();
    this.getCategories();
    this.userTokenData = this.userService.getUserTokenData();
    if ( this.userTokenData ) {
      this.userId =  this.userTokenData.UserId;
      console.log('User ID in AnotherComponent:', this.userId);

    } else {
      console.log('User token data not available in AnotherComponent');
    }
    this.payForm.get('userid')?.setValue(this.userId);

  }
 
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

  }




OpenDonateDialog(charity: any) {
  if (!this.userId) {
    this.toastr.warning('Please log in to donate.', 'Login Required');

    this.router.navigate(['/auth/login']); 
    return;
}
this.dialog.open(this.callDonateDialog,);
  this.charityId = charity.id;
  this.payForm.get('charityid')?.setValue(this.charityId);

}
  isUserLoggedIn() {
    throw new Error('Method not implemented.');
  }

  Donation(){
    console.log('Charity not paid!',this.payForm.value);

    this.userService.donateForCharity(this.userId, this.charityId,this.payForm.value).subscribe((_res:any) => {
         console.log('Charity payed successfully!');
         this.toastr.success('Charity payid successfully.', 'Success');
         this.dialog.closeAll();
         this.payForm.reset();

    })
  }
  payForm : FormGroup = new FormGroup({
    userid: new FormControl(''),
    charityid: new FormControl(''),
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
