import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User={};
  totalProject=0;
  totalToDoTask=0;
  totalInProgressTask=0;
  totalCompleteTask=0;

  constructor(private fb: FormBuilder,private userService:UserService,private projectService:ProjectService,public dialogRef: MatDialogRef<ProfileComponent>,
  
  @Inject(MAT_DIALOG_DATA) public data: User){
    this.user=data;
  }

  ngOnInit() {
    this.projectService.getAllProject().subscribe(data => {
      this.totalProject=data.length;
      data.forEach(p => p.statusList?.forEach(s => {
        if(s.status?.trim().toLowerCase()=="to do") {
          // s.tasks?.forEach(t => this.totalToDoTask++);
          s.tasks?.forEach(t => {
            t.assignees?.forEach(a => {
              if(a.trim().toLowerCase()==localStorage.getItem('email')) {
                this.totalToDoTask++;
              }
            })
          })
        }
        if(s.status?.trim().toLowerCase()=="in progress") {
          // s.tasks?.forEach(t => this.totalInProgressTask++);
          s.tasks?.forEach(t => {
            t.assignees?.forEach(a => {
              if(a.trim().toLowerCase()==localStorage.getItem('email')) {
                this.totalInProgressTask++;
              }
            })
          })
        }
        if(s.status?.trim().toLowerCase()=="complete") {
          // s.tasks?.forEach(t => this.totalCompleteTask++);
          s.tasks?.forEach(t => {
            t.assignees?.forEach(a => {
              if(a.trim().toLowerCase()==localStorage.getItem('email')) {
                this.totalCompleteTask++;
              }
            })
          })
        }
      }))
    })
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(data => this.user=data);
  }

  uploadImage(event:any) {
    console.log("upload image method");
    if(event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload= (e:any) => {
        this.user.imageUrl=e.target.result;
        this.updateUser();
      }
    }
  }
}
