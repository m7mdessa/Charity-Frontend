import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from '../service/pages.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  focus: any;
  focus1: any;
  contact: any[] = [];
  titleContact:any = 'contact'

  constructor( private pageService: PagesService,  private toastr: ToastrService,  private contactService: ContactService){}
  


  ngOnInit(): void {

    this.getContactPage();

  }

  addContact :FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    subject: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    contactname: new FormControl('',[Validators.required]),
    message: new FormControl('',[Validators.required]),

  });

  getContactPage() {
    this.pageService.getPage(this.titleContact).subscribe((contact) => {
      this.contact = contact;
    });

  }

  addMessage() {
    console.log('Add Contact Page Form Value:', this.addContact.value);
  
    this.contactService.addContact(this.addContact.value).subscribe(
      (resp: any) => {
        console.log('Response:', resp);
        this.toastr.success('Contact  Added successfully.', 'Success');
        this.getContactPage();
        this.addContact.reset();  
          },
      (err) => {
        console.error('Error:', err);
        this.toastr.error('Something went wrong !!', 'Error');
      }
    );
  }
}
