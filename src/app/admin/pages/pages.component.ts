
import { Component , OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})

export class PagesComponent implements OnInit {
  @ViewChild('selectPage') selectPage!:TemplateRef<any>
  @ViewChild('callCreateHomeDialog') callCreateHomeDialog!:TemplateRef<any>
  @ViewChild('callEditHomeDailog') callEditHomeDailog!:TemplateRef<any>
  @ViewChild('callCreateAboutDialog') callCreateAboutDialog!:TemplateRef<any>
  @ViewChild('callEditAboutDailog') callEditAboutDailog!:TemplateRef<any>
  @ViewChild('callCreateContactDialog') callCreateContactDialog!:TemplateRef<any>
  @ViewChild('callEditContactDailog') callEditContactDailog!:TemplateRef<any>
  @ViewChild('callDelete') callDelete!:TemplateRef<any>

  home: any[] = [];
  about: any[] = [];
  contact: any[] = [];
  page: any[] = [];
  titleHome:any = 'home'
  titleAbout:any = 'about'
  titleContact:any = 'contact'
  isLinear = false;


  constructor( private pageService: PagesService,  private toastr: ToastrService,private dialog:MatDialog){}
  


  ngOnInit(): void {
    this.getAboutPage();
    this.getHomePage();
    this.getContactPage();

  }


  addHome :FormGroup = new FormGroup({
    content: new FormControl('',[Validators.required]),
    slide1: new FormControl([Validators.required]),
    slide2: new FormControl([Validators.required]),
    slide3: new FormControl([Validators.required]),
    title: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    logo: new FormControl([Validators.required]),
  });

  editHome :FormGroup  = new FormGroup({
    id: new FormControl(''),
    content: new FormControl('',[Validators.required]),
    slide1: new FormControl([Validators.required]),
    slide2: new FormControl([Validators.required]),
    slide3: new FormControl([Validators.required]),
    title: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    logo: new FormControl([Validators.required]),
  });


  addAbout :FormGroup = new FormGroup({
    content: new FormControl('',[Validators.required]),
    slide1: new FormControl([Validators.required]),
    title: new FormControl('',[Validators.required]),
  });

  editAbout :FormGroup  = new FormGroup({
    id: new FormControl(''),
    content: new FormControl('',[Validators.required]),
    slide1: new FormControl([Validators.required]),
    title: new FormControl('',[Validators.required]),
  });

  addContact :FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),

  });

  editContact :FormGroup  = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),

  });


  getHomePage() {
    this.pageService.getPage(this.titleHome).subscribe((home) => {
      this.home = home;
    });

  }

  getAboutPage() {
    this.pageService.getPage(this.titleAbout).subscribe((about) => {
      this.about = about;
    });

  }

 getContactPage() {
    this.pageService.getPage(this.titleContact).subscribe((contact) => {
      this.contact = contact;
    });

  }
  OpenDialogselectPage(){
    
    this.dialog.open(this.selectPage);
    
    }
    OpenDialogAddHome(){
    
    this.dialog.open(this.callCreateHomeDialog);
    
    }

    OpenDialogAddAbout(){
    
      this.dialog.open(this.callCreateAboutDialog);
      
    }

    OpenDialogAddContact(){
    
      this.dialog.open(this.callCreateContactDialog);
      
    }

    openEditHomeDailog(home: any) {
      this.editHome.setValue({
        id: home.id,
        content: home.content,
        slide1: home.slide1,
        slide2: home.slide2,
        slide3: home.slide3,
        title: home.title,
        email: home.email,
        location: home.location,
        phone: home.phone,
        logo: home.logo
      });
      this.dialog.open(this.callEditHomeDailog);
  
    }
    openEditAboutDailog(about: any) {
      this.editAbout.setValue({
        id: about.id,
        content: about.content,
        slide1: about.slide1,
        title: about.title,
       
      });
      this.dialog.open(this.callEditAboutDailog);
  
    }

    openEditContactDailog(contact: any) {
      this.editContact.setValue({
        id: contact.id,
        title: contact.title,
        email: contact.email,
        location: contact.location,
        phone: contact.phone,
       
      });
      this.dialog.open(this.callEditContactDailog);
  
    }

    openDeleteDailog(id:number){
      console.log(id)
  
      const dialogRef= this.dialog.open(this.callDelete);
      dialogRef.afterClosed().subscribe((result)=>{
         if(result!=undefined)
         {
          if (result == 'yes') {
       
      this.pageService.deletePage(id).subscribe(
        () => {
          this.page = this.page.filter((page) => page.id !== id);
          console.log('Page deleted successfully.');
          this.getAboutPage();      
          this.getHomePage();      
          this.getContactPage();      
          this.dialog.closeAll();      

        },
        (error) => {
          console.log('Error while deleting Page:', error);
        }
      );      
          } else if (result == 'no') {
            console.log("Thank you");
          }
          
             
         }
   
      })
     }

    addHomePage() {
    console.log('Add Home Page Form Value:', this.addHome.value);
  
    this.pageService.addHomePage(this.addHome.value).subscribe(
      (resp: any) => {
        console.log('Response:', resp);
        this.toastr.success('Home Page Added successfully.', 'Success');
        this.getHomePage();
        this.dialog.closeAll();      
        this.addHome.reset();  
          },
      (err) => {
        console.error('Error:', err);
        this.toastr.error('Something went wrong !!', 'Error');
      }
    );
  }

  updateHomePage() {
    this.pageService.updateHomePage(this.editHome.value).subscribe(
      (response) => {
        console.log( this.editHome.value);

        console.log('Home Page updated successfully:', response);
        this.toastr.success('Home Page updated successfully.', 'Success');
        this.getHomePage(); 
        this.dialog.closeAll();      

      
      },
      (error) => {
        console.log( this.editHome.value);

        console.log('Error while home update Page:', error);
          this.toastr.error('Error while home update Page.', 'Error'); 

      }
    );
  }

 addAboutPage() {
    console.log('Add About Page Form Value:', this.addAbout.value);
  
    this.pageService.addAboutPage(this.addAbout.value).subscribe(
      (resp: any) => {
        console.log('Response:', resp);
        this.toastr.success('About Page Added successfully.', 'Success');
        this.getAboutPage();
        this.dialog.closeAll();      
        this.addAbout.reset();  
          },
      (err) => {
        console.error('Error:', err);
        this.toastr.error('Something went wrong !!', 'Error');
      }
    );
  }

  updateAboutPage() {
    this.pageService.updateAboutPage(this.editAbout.value).subscribe(
      (response) => {
        console.log( this.editAbout.value);

        console.log('About Page updated successfully:', response);
        this.toastr.success('About Page updated successfully.', 'Success');
        this.getAboutPage(); 
        this.dialog.closeAll();      

      
      },
      (error) => {
        console.log( this.editAbout.value);

        console.log('Error while about update Page:', error);
          this.toastr.error('Error while about update Page.', 'Error'); 

      }
    );
  }
  addContactPage() {
    console.log('Add Contact Page Form Value:', this.addContact.value);
  
    this.pageService.addContactPage(this.addContact.value).subscribe(
      (resp: any) => {
        console.log('Response:', resp);
        this.toastr.success('Contact Page Added successfully.', 'Success');
        this.getContactPage();
        this.dialog.closeAll();      
        this.addContact.reset();  
          },
      (err) => {
        console.error('Error:', err);
        this.toastr.error('Something went wrong !!', 'Error');
      }
    );
  }

  updateContactPage() {
    this.pageService.updateContactPage(this.editContact.value).subscribe(
      (response) => {
        console.log( this.editContact.value);

        console.log('Contact Page updated successfully:', response);
        this.toastr.success('Contact Page updated successfully.', 'Success');
        this.getContactPage(); 
        this.dialog.closeAll();      

      
      },
      (error) => {
        console.log( this.editContact.value);

        console.log('Error while contact update Page:', error);
          this.toastr.error('Error while contact update Page.', 'Error'); 

      }
    );
  }

  Slide1(slide1:any)
    {

    if(slide1.length==0)
    return ; 
    let fileToUpload=<File>slide1[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.pageService.Slide1(formDate);

    }

    Slide2(slide2:any)

    {

    if(slide2.length==0)
    return ; 
    let fileToUpload=<File>slide2[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.pageService.Slide2(formDate);

    }
    
    
    Slide3(slide3:any)
    {

    if(slide3.length==0)
    return ; 
    let fileToUpload=<File>slide3[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.pageService.Slide3(formDate);

    }

    Logo(logo:any)

    {
  
    let fileToUpload=<File>logo[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.pageService.Logo(formDate);

    }

   

    
}
