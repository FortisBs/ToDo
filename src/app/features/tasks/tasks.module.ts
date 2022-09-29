import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { ActionBarModule } from "../../shared/action-bar/action-bar.module";
import { HttpClientModule } from "@angular/common/http";
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './modals/add-task/add-task.component';
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "../../shared/pipes/filter/filter.pipe";

@NgModule({
  declarations: [
    TasksComponent,
    TasksListComponent,
    TaskComponent,
    AddTaskComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ActionBarModule,
    FormsModule
  ]
})
export class TasksModule { }
