import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AuthGuard } from "../../shared/guards/auth.guard";
import { ManageComponent } from './manage.component';
import { PersonalInfoComponent } from './profile/personal-info/personal-info.component';
import { TaskListStyleComponent } from './styling/task-list-style/task-list-style.component';

const routes: Routes = [
  { path: '', component: ManageComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal-info' },
      { path: 'personal-info', component: PersonalInfoComponent, canActivate: [AuthGuard] },
      { path: 'task-list-style', component: TaskListStyleComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    ManageComponent,
    PersonalInfoComponent,
    TaskListStyleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ManageModule {}
