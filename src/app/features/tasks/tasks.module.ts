import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ToolbarModule } from "../../shared/components/toolbar/toolbar.module";
import { DragAndDropModule } from "../../shared/directives/drag-and-drop/drag-and-drop.module";
import { LoadingSpinnerModule } from "../../shared/components/loading-spinner/loading-spinner.module";

import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskComponent } from './task/task.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskCommentsComponent } from './task-comments/task-comments.component';
import { AuthGuard } from "../../shared/guards/auth.guard";

@NgModule({
  declarations: [
    TasksComponent,
    TasksListComponent,
    TaskComponent,
    TaskModalComponent,
    TaskCommentsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TasksComponent, canActivate: [AuthGuard] }]),
    ToolbarModule,
    DragAndDropModule,
    LoadingSpinnerModule
  ]
})
export class TasksModule { }
