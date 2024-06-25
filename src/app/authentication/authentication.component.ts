import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  authService: AuthService;
  isLoggedIn = false;
  isSigningUp = false;
  authForm = this.fb.group({
    name: [
      '',
      this.isSigningUp ? Validators.required : Validators.nullValidator,
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    mobile: [
      '',
      this.isSigningUp ? Validators.required : Validators.nullValidator,
    ],
  });

  constructor(authService: AuthService, private fb: FormBuilder,private router:Router) {
    this.authService = authService;
  }
  login() {
    if (this.authForm.valid) {
       this.authService.login(this.authForm.value).subscribe((data:any)=>{
        if(data.user.email){
          console.log("Message from server",data);
            this.router.navigate(['/chat']);
        }
      })
    }
  }

  signUp() {
    console.log('signup');
    if (this.authForm.valid) {
      this.authService.signUp(this.authForm.value).subscribe((data:any)=>{
        if(data.messaage=="Success"){
          console.log("Message from server",data);
            this.router.navigate(['/login']);
        }
      })
    }
  }

  logout() {
    // Implement logout logic here
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
}
