import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchpassword } from 'src/app/matchpassword.validator';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private router:Router, private userService:UserService) {}
  registerForm:FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
    password: ['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
ConfirmPassword:[(null)],

  //Validators:matchpassword

  });

  get name()
  {
    return this.registerForm.get('name');
  }
  get email(){
    return this.registerForm.get('email')
  }
  get password()
  {
    return this.registerForm.get('password');
  }


  onSubmit() {
    this.userService.register(this.registerForm.value).subscribe(data =>{ Swal.fire("User Registered Successfully")
    this.router.navigateByUrl("login");},
    error=>{
      alert("User is Already Registered !!")
  });
  }
}
