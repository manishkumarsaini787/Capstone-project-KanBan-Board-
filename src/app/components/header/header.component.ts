import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { ProfileComponent } from '../profile/profile.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    user:User={};
    projects:Project[]=[];
    project:Project = {};

  constructor(private breakpointObserver: BreakpointObserver, private router:Router,private projectService:ProjectService,private userService:UserService,private dialog: MatDialog) {
  this.allProjects();
  }
  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      this.user = data;
      localStorage.setItem('email',""+data.email);
    });
    this.projectService.getAllProject().subscribe(data => this.projects = data);
  }

  logout() {
    console.log("logout");
    this.userService.logout();
    this.router.navigateByUrl("/");
  }

  allProjects(){
    this.projectService.getAllProject().subscribe(data=> this.projects=data)
    }

  searchText:string="";


  search(){
    console.log(this.searchText)
    if(this.searchText===null)
    {
      this.allProjects();
    }
    else{
      this.projects=this.projects.filter(data=> data.projectTitle?.startsWith(this.searchText))

    }


    }

    clear(){
      this.allProjects();
    }

    home(){
      this.router.navigateByUrl("/header")
    }


  openProjectDialog(project:Project) {
    console.log(project);
    const projectDialogRef = this.dialog.open(CreateComponent, {data: project,width:'350px'});
    projectDialogRef.afterClosed().subscribe(data => {
      this.projectService.getAllProject().subscribe(data => this.projects = data);
    });
  }

  openProfileDialog() {
    const projectDialogRef = this.dialog.open(ProfileComponent, {data: this.user,width:'400px'});
    projectDialogRef.afterClosed().subscribe(data => this.userService.getUser().subscribe(data => {
      this.user = data;
      localStorage.setItem('email',""+data.email);
    }));
  }

  deleteProject(projectId:any){
    Swal.fire({
      text: 'You want to delete this project',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {

        this.projectService.deleteProject(projectId).subscribe(data=>{
          console.log(data);

    this.projectService.getAllProject().subscribe(data => this.projects = data);
          Swal.fire("Success","Project delete","success"),window.location.reload},
          error=>Swal.fire("Failure","only owner can delete the project","error"));


      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })
}
}
