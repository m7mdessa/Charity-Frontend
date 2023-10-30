import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutherizationGuard implements CanActivate {
  constructor(private router: Router,private toastr: ToastrService,) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    console.log(state);
    if (token) {
      if (state.url.indexOf('admin') >= 0) {
        let user: any = localStorage.getItem('user');

        if (user) {
          user = JSON.parse(user);
          if (user.Role == 'admin') {
             this.toastr.success('Welcome in admin pages ');
            return true;
          } 
        } else {
          this.toastr.warning('you are not user from db');
          return false;
        }
      }
      
      else  if (state.url.indexOf('user') >= 0) {
        let user: any = localStorage.getItem('user');

        if (user) {
          user = JSON.parse(user);
          if (user.Role == 'user') {
            this.toastr.success('Welcome in admin pages ');
            return true;
          } 
        } 
        else {
          this.toastr.warning('you are not user from db');
          return false;
        }
      } 

      return true;
    } 
    else {
      this.router.navigate(['']);
      this.toastr.warning('you are not autherize !!')
      return false;
    }
  }
}
