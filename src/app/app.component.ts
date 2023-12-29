import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild,AfterContentChecked,AfterContentInit,AfterViewChecked, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, map, shareReplay, startWith, takeUntil } from 'rxjs';
import { Project } from './model/project';
import { User } from './model/user';
import { ProjectService } from './services/project.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { ChangeDetectorRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
 
  title = "Kanban Board"
  }


