
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient,private router: Router,private toastr:ToastrService,private userService: UserService,private usersService: UsersService) { }
  private UserId : any ;


  Register(Register: any): Observable<any>{

    return  this.http.post('https://localhost:7091/api/Auth/Register/',Register);
 
  }

  Login(username: any, password: any) {

    
    var Login = {
      username: username.value.toString(),
      password: password.value.toString(),
    };

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    
    this.http.post('https://localhost:7091/api/Auth/Login/', Login, requestOptions).subscribe((res: any) => {
     
      const responce = { token: res.toString() }
      localStorage.setItem('token', responce.token);
      
      let data: any = jwt_decode(responce.token);
  console.log(data)
  const UserId = data.UserId;
  this.userService.setUserTokenData(data);
  this.usersService.setUserTokenData(data);

  console.log('User ID:', this.getUserId(UserId));

      localStorage.setItem('user', JSON.stringify(data));
  
      if (data.Role == "1") {
        this.toastr.success('Welcome On Admin Dashboard');
        this.router.navigate(['admin']);
      } else if (data.Role == "2") {
        this.toastr.success('Welcome On User Dashboard');
        this.router.navigate(['user/Profile']);
      } else {
        this.toastr.error('Something wrong!!');
        this.router.navigate(['']);
      }
    });
  }
  
  getUserId(UserId:any) {
    
    console.log('User ID:', this.UserId);

    return UserId;


  }

  Forgotpassword(Forgotpassword: any): Observable<any>{

    return  this.http.post('https://localhost:7091/api/Auth/Forgotpassword/',Forgotpassword);
 
  }

  Resetpassword(Resetpassword: any): Observable<any>{

    return  this.http.post('https://localhost:7091/api/Auth/Resetpassword/',Resetpassword);
 
  }


}


