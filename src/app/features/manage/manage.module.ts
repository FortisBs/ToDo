import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { ManageComponent } from './manage.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AuthGuard } from "../../shared/guards/auth.guard";

const routes: Routes = [
  { path: '', component: ManageComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal-info' },
      { path: 'personal-info', component: PersonalInfoComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  declarations: [
    ManageComponent,
    PersonalInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageModule {}
