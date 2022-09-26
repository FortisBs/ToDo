import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { ActionBarModule } from "../../shared/action-bar/action-bar.module";

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    ActionBarModule
  ]
})
export class TasksModule { }
