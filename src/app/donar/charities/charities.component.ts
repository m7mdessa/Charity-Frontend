
import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';   
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { CategoriesService } from 'src/app/service/categories.service';
import { CharitiesService } from 'src/app/service/charities.service';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.css'],
  
})

export class CharitiesComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callPayDialog') callPayDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>

  map!: google.maps.Map;
  google: any;
  Charities: any[] = [];
  categories: any[] = [];
  profile: any[] = [];

totalPrice: number = 1000; // Replace 1000 with your actual total price
currentPrice: number = 0;
isLinear = false;

  constructor(private charitiesService: CharitiesService, private userService: UserService,private toastr: ToastrService,private categoriesService:CategoriesService,private dialog:MatDialog ) { }
  ngOnInit() {
 
    this.getCategories();
    this.getCharities();
    this.getProfile();

    this.initMap();
    this.loadMapScript();

    }
  
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

  }
  getProfile() {
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.userService.getUser(userId).subscribe((profile) => {
      this.profile = profile;
      console.log('profile',profile);

    });
  }
  getPercentage(): number {
    return (this.currentPrice / this.totalPrice) * 100;
  }
  updateCurrentPrice(amount: number) {
    this.currentPrice += amount;
    // Optionally, you can update the progress bar in real-time here
    // Example: this.updateProgressBar();
  }
  payForcharity(charity: any) {
    charity.status = 'Paid';
  }
  CreateForm : FormGroup = new FormGroup({
    userid: new FormControl(),
    categoryid: new FormControl('',[Validators.required]),
    charityname: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    mission: new FormControl('',[Validators.required]),
    goalPrice: new FormControl('',[Validators.required]),
    minPrice: new FormControl('',[Validators.required]),
    longitude: new FormControl(0),
    latitude: new FormControl(0),
    image: new FormControl([Validators.required])
   });

   payForm : FormGroup = new FormGroup({
    cardholdernumber: new FormControl(),
    cardnumber: new FormControl(),
    expirationdate: new FormControl(),
    cvv: new FormControl()

   });

   UploadImage(file:any)
   {
   if(file.length==0)
   return ; 
   let fileToUpload=<File>file[0];
   const formDate=new FormData();
   formDate.append('file',fileToUpload,fileToUpload.name);
   this.charitiesService.uploadAttachment(formDate);
   }

  OpenDialogCharities()
  {
    
  this.dialog.open(this.callCreateDialog);
  
  }




  
  OpenDialogPay(charityId:number){
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    console.log(charityId,userId)

    const dialogRef= this.dialog.open(this.callPayDialog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.userService.payForCharity(userId,charityId,this.payForm.value).subscribe((_res:any) => {
            console.log('Charity payed successfully!');
            this.toastr.success('Charity payed successfully.', 'Success');
            this.getCharities(); 
            this.dialog.closeAll();
            this.payForm.reset();
   
       }) 
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

  getCharities() {
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.charitiesService.getCharityByUserId(userId).subscribe((Charities) => {
      console.log(Charities);

      this.Charities = Charities;
    });
  }
  loadMapScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGTMxtpMfSs1CP-y1lTLbjqwsD9KHgd2U';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initMap();
    };
    document.head.appendChild(script);
  }


  initMap() {
    const mapElement = document.getElementById("map-container");
    if (mapElement !== null) {
      const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      };
      const map = new google.maps.Map(mapElement, mapOptions);

     
    } else {
      console.error("Element with ID 'map-container' not found.");
    }
  }
  addCharity(){
    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
    
      var userId = userData.UserId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    console.log(this.CreateForm.value);
    this.CreateForm.get('userid')?.setValue(userId);

    this.charitiesService.addCharity(this.CreateForm.value).subscribe((_res:any) => {
         console.log('Charity aded successfully!');
         this.toastr.success('Charity aded successfully.', 'Success');
         this.getCharities(); 
         this.dialog.closeAll();
         this.CreateForm.reset();

    })
  }

 
   openDeleteDailog(id:number){
    console.log(id)

    const dialogRef= this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.charitiesService.deleteCharity(id).subscribe(
            () => {
              this.Charities = this.Charities.filter((Charity) => Charity.id !== id);
              console.log('Charity deleted successfully.');
              this.dialog.closeAll();      

            },
            (error) => {
              console.log('Error while deleting Charity:', error);
            }
          );       
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }




}


  

