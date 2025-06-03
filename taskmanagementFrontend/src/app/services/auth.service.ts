import {Injectable, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(readonly HttpClient: HttpClient) { }


  loginUser(username:any, password:any) {
    let req = {
      username:username,
      password:password
    }

   return  this.HttpClient.post<any[]>('/api/user/login',req,{ withCredentials: true });
  }

}
