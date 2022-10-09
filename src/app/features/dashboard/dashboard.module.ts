import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToolbarModule } from "../../shared/components/toolbar/toolbar.module";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from './board/board.component';
import { BoardModalComponent } from './board-modal/board-modal.component';
import { AuthGuard } from "../../shared/guards/auth.guard";

@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    BoardModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToolbarModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent, canActivate: [AuthGuard] }])
  ]
})
export class DashboardModule { }
