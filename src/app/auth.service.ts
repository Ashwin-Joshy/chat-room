import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpclientService;
  constructor(http: HttpclientService) {
    this.http = http;
  }
  login(data: any):any {
    return this.http.login({email:data.email,password:data.password})
  }
  signUp(data: any) {
    return this.http.signUp({
      name:data.name,
      email:data.email,
      password:data.password,
      mobile:data.mobile
    })
  }
 
}
