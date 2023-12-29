import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginStatus:boolean=false;

  constructor(private http:HttpClient) { }
  registerUrl="http://localhost:8080/kanbanService/Register";

  register(user:User):Observable<User>{
    return this.http.post<User>(`${this.registerUrl}`,user)
  }
  // isLogedin(){
  //   this.loginStatus=true;
  // }

  loginUrl="http://localhost:8080/userAuth/login";
  loginUser(login:User):Observable<any>{

    return this.http.post(`${this.loginUrl}`,login);
  }
  usertoken:string="Userlogin"

  public login(token:any)
   {
      localStorage.setItem(this.usertoken,token);
      // console.log("Token is "+token);
      return true;
   }
   public isLoggedin()
   {
      let webToken = localStorage.getItem(this.usertoken);
      if(webToken=="" || webToken==undefined || webToken==null)
      {
        return false;
      }else
      {
        return this.loginStatus = true;
      }
   }

   public logout()
   {
    localStorage.clear();
   }

   getUserUrl="http://localhost:8080/kanbanService/user/getUser";

  getUser():Observable<User>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get<User>(`${this.getUserUrl}`,requestOption)
  }

  updateUserUrl="http://localhost:8080/kanbanService/user/updateUser";

  updateUser(user:User):Observable<User>{
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.put<User>(`${this.updateUserUrl}`,user,requestOption)
  }

  userEmailUrl="http://localhost:8080/kanbanService/user/userEmails";

  userEmail(){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('Userlogin')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get(`${this.userEmailUrl}`,requestOption)
  }
}
