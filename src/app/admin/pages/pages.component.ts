
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
  @ViewChild('callCreateDialog') callCreateDialog!:TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  pages: any[] = [];
  

  constructor( private pageService: PagesService,  private toastr: ToastrService,private dialog:MatDialog){}
  


  ngOnInit(): void {
    this.getPages();
 
  }


  form :FormGroup = new FormGroup({
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


  edit :FormGroup  = new FormGroup({
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


  getPages() {
    this.pageService.getPages().subscribe((pages) => {
      this.pages = pages;
    });

  }
  
  OpenDialogAdd(){
    
    this.dialog.open(this.callCreateDialog);
    
    }
  
    openEditDailog(page: any) {
      this.edit.setValue({
        id: page.id,
        content: page.content,
        slide1: page.slide1,
        slide2: page.slide2,
        slide3: page.slide3,
        title: page.title,
        email: page.email,
        location: page.location,
        phone: page.phone,
        logo: page.logo
      });
      this.dialog.open(this.callEditDailog);
  
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
          this.pages = this.pages.filter((Page) => Page.id !== id);
          console.log('Page deleted successfully.');
          this.getPages(); 

          this.dialog.closeAll();      

        },
        (error) => {
          console.log('Error while deleting Home:', error);
        }
      );      
          } else if (result == 'no') {
            console.log("Thank you");
          }
          
             
         }
   
      })
     }

     addPage() {
    console.log('Add Page Form Value:', this.form.value);
  
    this.pageService.addPage(this.form.value).subscribe(
      (resp: any) => {
        console.log('Response:', resp);
        this.toastr.success('Page Added successfully.', 'Success');
        this.getPages();
        this.dialog.closeAll();      
        this.form.reset();  
          },
      (err) => {
        console.error('Error:', err);
        this.toastr.error('Something went wrong !!', 'Error');
      }
    );
  }

  updatePage() {
    this.pageService.updatePage(this.edit.value).subscribe(
      (response) => {
        console.log( this.edit.value);

        console.log('Page updated successfully:', response);
        this.toastr.success('Page updated successfully.', 'Success');
        this.getPages(); 
        this.dialog.closeAll();      

      
      },
      (error) => {
        console.log( this.edit.value);

        console.log('Error while update Page:', error);
          this.toastr.error('Error while update Page.', 'Error'); 

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
