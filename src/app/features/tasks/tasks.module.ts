import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { ActionBarModule } from "../../shared/action-bar/action-bar.module";
import { HttpClientModule } from "@angular/common/http";
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    TasksComponent,
    TasksListComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ActionBarModule
  ]
})
export class TasksModule { }
