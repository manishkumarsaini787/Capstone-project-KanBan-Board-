import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  project:Project={};
  currentDate: Date = new Date();
  
  constructor(private service:ProjectService, private fb: FormBuilder,private userService:UserService, private router:Router,public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

      ngOnInit() {
        this.project=this.data.project;
      }
    taskForm: FormGroup = this.fb.group({
      taskTitle: ['', [Validators.required]],
      startDate: [''],
      dueDate: [''],
      priority: [''],
      contents: [''],
      assignees: [[],[this.assigneesValidator()]]
    });

    get taskTitle() {
      return this.taskForm.get('taskTitle');
    }
    get assignees() {
      return this.taskForm.get('assignees');
    }
    
    errorMessage = "";
  assigneesValidator(){
    return(control:AbstractControl) => {
      let overLoadTask= false;
    const assignees = control.value;
    assignees?.forEach((a: string) => {
      let totalTask=0;
      this.project?.statusList?.filter(s => s.status?.trim().toLowerCase()=='to do')[0].tasks?.forEach(t => t.assignees?.forEach(as => {
        if(as.trim().toLowerCase()==a.trim().toLowerCase()) {
          totalTask++;
        }
      }));
      console.log(totalTask);
      if(totalTask>=3){
        this.errorMessage+=a;
        overLoadTask=true;
      }
    });
    if(overLoadTask) {
      this.errorMessage+=" already have 3 task for to do!"
      return {taskOverLoad:true, message:this.errorMessage};
    }
    return null;
    }
  }
  onSubmit(){
    let statusId = this.project.statusList?.filter(s => s.status?.trim().toLowerCase()=="to do")[0].statusId;
    return this.service.addTask(this.taskForm.value,this.project.projectId,statusId).subscribe(data=>{
      this.onNoClick();
      Swal.fire("Success","Add Task","success"),window.location.reload},
      error=>Swal.fire("Failure","Task already exist","error"));
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  printProject() {
    console.log(this.project);
  }
}
