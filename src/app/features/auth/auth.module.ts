import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AuthComponent } from './auth.component';
import { LoginGuard } from "../../shared/guards/login.guard";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent, canActivate: [LoginGuard] }])
  ]
})
export class AuthModule { }
