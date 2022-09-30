import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ActionBarModule } from "../../shared/action-bar/action-bar.module";
import { FormsModule } from "@angular/forms";

import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskComponent } from './task/task.component';
import { TaskModalComponent } from './task-modal/task-modal.component';

@NgModule({
  declarations: [
    TasksComponent,
    TasksListComponent,
    TaskComponent,
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ActionBarModule,
    FormsModule
  ]
})
export class TasksModule { }
