import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from "../../shared/components/toolbar/toolbar.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from './board/board.component';
import { BoardModalComponent } from './board-modal/board-modal.component';

@NgModule({
    declarations: [
        DashboardComponent,
        BoardComponent,
        BoardModalComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ToolbarModule
    ]
})
export class DashboardModule { }
