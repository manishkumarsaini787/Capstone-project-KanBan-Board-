import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private router:Router, private snak:MatSnackBar,private userService:UserService) {}

  loginForm:FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
    // password: ['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
    password: ['',[Validators.required]]

  });

  login:any;
  isLoggedin=false;
  onSubmit(): void {
    this.userService.loginUser(this.loginForm.value).subscribe(
      data => {
        this.login= data
        console.log(data);
        this.userService.login(this.login.Token);
        if(this.userService.isLoggedin())
        {
          localStorage.setItem("loginstatus","true");

          Swal.fire("Success","login successfully","success")
           this.router.navigateByUrl("/header");
        }
      },err => {this.snak.open("Login Details not Matching please Register","ok")}
    );
  }
  get email()
    {
      return this.loginForm.get('email');
    }
    get password(){
      return this.loginForm.get('password')
    }
}
