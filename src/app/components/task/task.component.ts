
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  project:Project={};
  task:Task={};
  statusId:Number = 0;
  statusName:String|undefined="";
  currentDate: Date = new Date();

  constructor(private projectService:ProjectService, private fb: FormBuilder,private userService:UserService, private router:Router,public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.project=data.project;
      this.task=data.task;
      this.statusId = data.statusId;
      this.statusName=this.getStatusName();
      console.log(this.task+"/"+this.statusId);
      }

      startDateChange(event: any) {
        this.task.startDate = event.target.value;
        this.task.startDate?.setDate(this.task.startDate.getDate() + 1);
        this.updateTask();
       }
      dueDateChange(event: any) {
        this.task.dueDate = event.target.value;
        this.task.dueDate?.setDate(this.task.dueDate.getDate() + 1);
        this.updateTask();
      }
      getStartDate(task: Task) {
        return task.startDate?.toString().substring(0, 10);
      }
      getDueDate(task: Task) {
        return task.dueDate?.toString().substring(0, 10);
      }
      setPriority(priority: Number) {
        this.task.priority = priority;
        this.updateTask();
      }

      getClass(priority: any) {
        if (priority == 1)
          return "high";
        else if (priority == 2)
          return "normal";
        else if (priority == 3)
          return "low";
        else
          return "clear";
      }


      updateAssignees(event: any) {
        this.task.assignees = event.value;
        this.updateTask();
      }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateTask() {
    this.projectService.updateTask(this.task,this.project.projectId,this.statusId,this.task.taskId).subscribe(data => {
      this.project=data;
      this.project.statusList?.forEach(s => s.tasks?.forEach(t => {
        if(t.taskId==this.task.taskId){
          this.task=t;
        }
      }))
    });
  }
  changeTaskStatus(newStatusId:any) {
    this.projectService.changeStatus(this.task,this.project.projectId,this.statusId,newStatusId)
    .subscribe(data => {
      this.project=data;
      this.statusId=newStatusId;
      this.statusName=this.getStatusName();
    });
  }
  getStatusName(){
    
    return this.project.statusList?.filter(s => s.statusId==this.statusId)[0].status;
  }
  completeTask(){
    let id = this.project.statusList?.filter(s => s.status?.toLowerCase().trim()=="complete")[0].statusId;
    this.changeTaskStatus(id);
  }

  deleteTask(){
    Swal.fire({
      text: 'You want to delete this Task',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {

        this.projectService.deleteTask(this.project.projectId,this.data.statusId,this.task.taskId).subscribe(data=>{
          this.project=data;
          Swal.fire("Success","Status delete","success"),window.location.reload},
          error=>Swal.fire("Failure","you can not delete tis status until it have task!","error"));

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })
}
}
