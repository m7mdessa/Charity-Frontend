import { Component,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { CategoriesService } from 'src/app/service/categories.service';
import { CharitiesService } from 'src/app/service/charities.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private router: Router,private userService: UserService,private adminService:AdminService,private charitiesService:CharitiesService) {}

  isSticky = false;
  username :any;
  profile: any[] = [];
  notifications: any[] = [];
  CharityByCategory: any[] = [];
  showSearchForm: boolean = false;

  toggleSearchForm() {
    this.showSearchForm = !this.showSearchForm;
  }

  ngOnInit() {
    this.getProfile() ;
    this.GetAllNotifications();
    this.loadStickyState();
    this.username

    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
        this.username  = userData.Name;

    
    } else {
      console.log('No user data found in local storage.');
    }
  }
  GetAllNotifications() {
    this.adminService.GetAllNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });

  }
  GetCharityByCategory(categoryId:any) {
    this.charitiesService.GetCharityByCategory(categoryId).subscribe((CharityByCategory) => {
      this.CharityByCategory = CharityByCategory;
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
  user?: any = localStorage.getItem('user');

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset;

    if (offset > 100) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }

    this.saveStickyState();
  }

  saveStickyState() {
    localStorage.setItem('isSticky', JSON.stringify(this.isSticky));
  }

  loadStickyState() {
    const stickyState = localStorage.getItem('isSticky');
    if (stickyState) {
      this.isSticky = JSON.parse(stickyState);
    }
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['']);
}

}