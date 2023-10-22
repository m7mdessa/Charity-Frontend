import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>

    categories: any[] = [];

    constructor(private categoriesService: CategoriesService,  private toastr: ToastrService,private dialog:MatDialog) {}
  
 
    ngOnInit(): void {
      this.getCategories();
  
    }
    
    getCategories() {
      this.categoriesService.getCategories().subscribe((categories) => {
        this.categories = categories;
      });
  
    }
    form :FormGroup = new FormGroup({
      categoryname: new FormControl('',[Validators.required]),
      image: new FormControl([Validators.required])
    });
    
    edit :FormGroup = new FormGroup({
      id: new FormControl(''),
      categoryname: new FormControl('',[Validators.required]),
      image: new FormControl([Validators.required])

    });

OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }

  openEditDailog(category: any) {
    this.edit.setValue({
      id: category.id,
      categoryname: category.categoryname,
      image: category.image,
    
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
          this.categoriesService.deleteCategory(id).subscribe(
            () => {
              this.categories = this.categories.filter((Category) => Category.id !== id);
              console.log('Category deleted successfully.');
              this.dialog.closeAll();      
            },
            (error) => {
              console.log('Error while deleting category:', error);
            }
          );         
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }
    addCategory() {

      this.categoriesService.addCategory(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Category Added successfully.', 'Success');
        this.getCategories();
        this.dialog.closeAll();      
        this.form.reset();

      },err=>{
        
        this.toastr.error('Something went wrong !!', 'error');
  
      });
    }
   
    
   

    UploadImage(file:any)
    {
    if(file.length==0)
    return ; 
    let fileToUpload=<File>file[0];
    const formDate=new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name);
    this.categoriesService.uploadAttachment(formDate);
    }

  
 
  
    updateCategory() {
      this.categoriesService.updateCategory(this.edit.value).subscribe(
        (response) => {
          console.log( this.edit.value);
  
          console.log('Categoryname updated successfully:', response);
          this.toastr.success('Category updated successfully.', 'Success');
          this.getCategories(); 
          this.dialog.closeAll();      

        
        },
        (error) => {
          console.log( this.edit.value);
  
          console.log('Error while update Category:', error);
            this.toastr.error('Error while update Category.', 'Error'); 
  
        }
      );
    }
  
  }
  

