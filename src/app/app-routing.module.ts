import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DefaultComponent } from './components/default/default.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectComponent } from './components/project/project.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:"",


    component:DefaultComponent

  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {



    path: "header",

    canActivate:[AuthGuard],

    component: HeaderComponent,

    children: [{


      path: "project/:id",
      component: ProjectComponent
    },
    {

      path: "",
      redirectTo: "project",
      pathMatch: "full"
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
