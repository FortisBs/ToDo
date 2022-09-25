import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ActionBarModule } from "../../shared/action-bar/action-bar.module";
import { DashboardModalComponent } from './dashboard-modal/dashboard-modal.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardModalComponent,
    DashboardItemComponent
  ],
  imports: [
    CommonModule,
    ActionBarModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
