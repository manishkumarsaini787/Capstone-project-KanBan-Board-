import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  project:Project={};

  constructor(private service:ProjectService, private fb: FormBuilder,private userService:UserService, private router:Router,public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project){
      this.project=data;
      this.addressForm.controls['projectTitle'].setValue(this.project.projectTitle);
      this.addressForm.controls['members'].setValue(this.project.members);
      this.userService.userEmail().subscribe(data => {
        const userEmails:any = data;
        this.emails=userEmails.emails;
        this.emails=this.emails.filter(e => e!=this.email);
      });
      }

      email:any=localStorage.getItem('email');
    emails:string[]=[];
  addressForm:FormGroup = this.fb.group({
    projectTitle: ['', Validators.required],
    members:[null,Validators.required]
  });
  onSubmit(){
    this.data.projectTitle=this.addressForm.controls['projectTitle'].value;
    return this.service.addProject(this.addressForm.value).subscribe(data=>{
      Swal.fire("Success","created Project","success"),window.location.reload},
      error=>Swal.fire("Failure","project not created","error"));
  }

  updateProject() {
    this.project.projectTitle=this.addressForm.controls['projectTitle'].value;
    this.project.members=this.addressForm.controls['members'].value;
    this.project.members?.push(this.email);
    console.log(this.project);
    this.service.updateProject(this.project).subscribe(data=>{
      this.onNoClick();
      Swal.fire("Success","Updated","success"),window.location.reload},
      error=>Swal.fire("Failure","error","error"))
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
