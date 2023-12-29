import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project';
import { Status } from 'src/app/model/status';
import { Task } from 'src/app/model/task';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private fb: FormBuilder,private dialog: MatDialog) { }

  renameStatusDisable=0;
  newStatus:Status={};
  taskBox:any=0;
  show = false;
  currentDate: Date = new Date();
  isOpen = false;
  project: Project = {};


  taskForm: FormGroup = this.fb.group({
    taskTitle: ['', [Validators.required]],
    startDate: [''],
    dueDate: [''],
    priority: [''],
    contents: [''],
    assignees: [[]]
  })

  ngOnInit() {
    let id: Number | any;
    // this.route.paramMap.subscribe((param:ParamMap) => id=param.get("id"));
    this.route.params.subscribe(params => {
      id = params['id'];
      // reset and set based on new parameter this time
      this.getProject(id);
    });
  }


  getProject(projectId: Number | undefined) {
    this.projectService.getProjectById(projectId).subscribe(data => {
      this.project = data;
    });
  }
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.projectService.updateProject(this.project).subscribe(data => this.project = data);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.projectService.updateProject(this.project).subscribe(data => this.project = data);
    }
  }


  startDateChange(task: Task, event: any) {
    task.startDate = event.target.value;
    task.startDate?.setDate(task.startDate.getDate() + 1);
    this.projectService.updateProject(this.project).subscribe(data => this.project = data);
    console.log(task);
  }
  dueDateChange(task: Task, event: any) {
    task.dueDate = event.target.value;
    task.dueDate?.setDate(task.dueDate.getDate() + 1);
    this.projectService.updateProject(this.project).subscribe(data => this.project = data);
    console.log(task);
  }
  getStartDate(task: Task) {
    return task.startDate?.toString().substring(0, 10);
  }
  getDueDate(task: Task) {
    return task.dueDate?.toString().substring(0, 10);
  }
  setPriority(task: Task, priority: Number) {
    task.priority = priority;
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


  updateAssignees(task: Task, event: any) {
    console.log(task.assignees);
    console.log(event.value);

    let errorMessage = "";
    let overLoadTask = false;
    let assignees = event.value;
    assignees?.forEach((a: string) => {
      let totalTask=0;
      this.project?.statusList?.filter(s => s.status?.trim().toLowerCase()=='to do')[0].tasks?.forEach(t => t.assignees?.forEach(as => {
        if(as.trim().toLowerCase()==a.trim().toLowerCase()) {
          totalTask++;
        }
      }));
      console.log(totalTask);
      if(totalTask>=3){
        errorMessage+=a;
        overLoadTask=true;
      }
    });
    if(!overLoadTask) {
      task.assignees = event.value;
    this.projectService.updateProject(this.project).subscribe(data => this.project = data);
    console.log(task);
    } else {
      this.getProject(this.project.projectId);
      Swal.fire("Failure",errorMessage+" already have 3 or more tasks","error");
    }
  }
  addStatus(){
    this.projectService.addStatus(this.newStatus,this.project.projectId).subscribe(data=>{
      this.project=data;
      this.newStatus={};
      Swal.fire("Success","Add Status","success"),window.location.reload},
      error=>Swal.fire("Failure","Status already exist","error"))
  }

  openCreateTaskDialog() {
    const projectDialogRef = this.dialog.open(CreateTaskComponent, {data: {'project':this.project},width:'500px',height:'400px'});
    projectDialogRef.afterClosed().subscribe(data => this.getProject(this.project.projectId));
  }
  openTaskDialog(statusId:Number | undefined,task:Task) {
    const projectDialogRef = this.dialog.open(TaskComponent, {data: {'project':this.project,'statusId':statusId,'task':task},width:'70%',height: 'fit-content'});
    projectDialogRef.afterClosed().subscribe(data => this.getProject(this.project.projectId));
  }
  renameStatusDisabledChange(statusId:any){
    this.renameStatusDisable=statusId;
  }
  onStatusChange(event:any,status:any){
    if(event.target.value==null || event.target.value==undefined || event.target.value=="") {
      console.log("return");
    } else {
      status.status=event.target.value;
      this.projectService.updateStatus(status,this.project.projectId,status.statusId).subscribe(data=>{
        this.project=data;
        Swal.fire("Success","Status update","success"),window.location.reload},
        error=>Swal.fire("Failure","Empty or duplicate status not allowed","error"))
    }
    this.renameStatusDisable=0;
  }

  deleteStatus(statusId:any){
      Swal.fire({
        text: 'You want to delete this status',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {

        if (result.isConfirmed) {

          this.projectService.deleteStatus(this.project.projectId,statusId).subscribe(data=>{
            this.project=data;
            Swal.fire("Success","Status delete","success"),window.location.reload},
            error=>Swal.fire("Failure","you can not delete tis status until it have task!","error"));

        } else if (result.isDismissed) {

          console.log('Clicked No, File is safe!');

        }
      })
  }

}
