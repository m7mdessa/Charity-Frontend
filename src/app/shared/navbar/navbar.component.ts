import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSticky = false;

  ngOnInit() {
    this.loadStickyState();
  }

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
}
