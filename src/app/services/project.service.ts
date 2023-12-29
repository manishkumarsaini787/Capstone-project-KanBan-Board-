import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { Status } from '../model/status';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  addProjectUrl="http://localhost:8080/kanbanService/project/save";

  addProject(project:Project):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.post<Project>(`${this.addProjectUrl}`,project,requestOption)
  }

  getProjectByIdUrl = "http://localhost:8080/kanbanService/project/getProject/";
  getProjectById(projectId:Number | any):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get<Project>(`${this.getProjectByIdUrl}`+projectId,requestOption)
  }

  getAllProjectUrl="http://localhost:8080/kanbanService/project/getAll";

  getAllProject():Observable<[Project]>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get<[Project]>(`${this.getAllProjectUrl}`,requestOption)
  }

  updateProjectUrl="http://localhost:8080/kanbanService/project/update";

  updateProject(project:Project):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.put<Project>(`${this.updateProjectUrl}`,project,requestOption)
  }

  deleteProjectUrl="http://localhost:8080/kanbanService/project/delete";

  deleteProject(projectId:Number):Observable<Boolean>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.delete<Boolean>(`${this.deleteProjectUrl}/${projectId}`,requestOption)
  }

  addStatusUrl="http://localhost:8080/kanbanService/project/addStatus";

  addStatus(status:Status, projectId:Number|any):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.post<Project>(`${this.addStatusUrl}/${projectId}`,status,requestOption)
  }

  deleteStatusUrl="http://localhost:8080/kanbanService/project/deleteStatus";

  deleteStatus(projectId:Number|undefined,statusId:Number):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.delete<Project>(`${this.deleteStatusUrl}/${projectId}/${statusId}`,requestOption)
  }

  updateStatusUrl="http://localhost:8080/kanbanService/project/updateStatus";

  updateStatus(status:Status,projectId:Number|undefined,statusId:Number):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.put<Project>(`${this.updateStatusUrl}/${projectId}/${statusId}`,status,requestOption)
  }

  getAllStatusUrl="http://localhost:8080/kanbanService/project/allStatus";

  getAllStatus(projectId:Number):Observable<Status>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get<Status>(`${this.getAllStatusUrl}/${projectId}`,requestOption)
  }

  addTaskUrl="http://localhost:8080/kanbanService/project/addTask";

  addTask(task:Task, projectId:Number|any,statusId:Number|any):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.post<Project>(`${this.addTaskUrl}/${projectId}/${statusId}`,task,requestOption)
  }

  deleteTaskUrl="http://localhost:8080/kanbanService/project/deleteTask";

  deleteTask(projectId:Number|undefined,statusId:Number,taskId:Number|undefined):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.delete<Project>(`${this.deleteTaskUrl}/${projectId}/${statusId}/${taskId}`,requestOption)
  }

  updateTaskUrl="http://localhost:8080/kanbanService/project/updateTask";

  updateTask(task:Task,projectId:Number|undefined,statusId:Number,taskId:Number|undefined):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.put<Project>(`${this.updateTaskUrl}/${projectId}/${statusId}`,task,requestOption)
  }

  changeStatusUrl="http://localhost:8080/kanbanService/project/changeStatus";

  changeStatus(task:Task,projectId:Number|undefined,oldStatus:Number,newStatus:Number):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.put<Project>(`${this.changeStatusUrl}/${projectId}/${oldStatus}/${newStatus}`,task,requestOption)
  }

  addMemberUrl="http://localhost:8080/kanbanService/project/addMember";

  addMember(projectId:Number,emailId:String):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.post<Project>(`${this.addMemberUrl}/${projectId}/${emailId}`,requestOption)
  }

  deleteMemberUrl="http://localhost:8080/kanbanService/project/deleteMember";

  deleteMember(projectId:Number,emailId:String):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.delete<Project>(`${this.deleteMemberUrl}/${projectId}/${emailId}`,requestOption)
  }

  getMemberUrl="http://localhost:8080/kanbanService/project/members";

  getMember(projectId:Number):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get<Project>(`${this.getMemberUrl}/${projectId}`,requestOption)
  }

  //at last we will work on this

  addAssigneeUrl="http://localhost:8080/kanbanService/project/addAssignee";

  addAssignee(emailId:String,projectId:Number,statusId:Number,taskId:Number):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.post<Project>(`${this.addAssigneeUrl}/${emailId}/${projectId}/${statusId}/${taskId}`,requestOption)
  }


  deleteAssigneeUrl="http://localhost:8080/kanbanService/project/deleteAssignee";

  deleteAssignee(emailId:String,projectId:Number,statusId:Number,taskId:Number):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.delete<Project>(`${this.deleteAssigneeUrl}/${projectId}/${statusId}/${taskId}/${emailId}`,requestOption)
  }

  getAllAssigneeUrl="http://localhost:8080/kanbanService/project/assignees";

  getAllAssignee(projectId:Number,statusId:Number,taskId:Number):Observable<Project>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.delete<Project>(`${this.getAllAssigneeUrl}/${projectId}/${statusId}/${taskId}`,requestOption)
  }

}
