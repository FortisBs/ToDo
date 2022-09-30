import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarModule } from "../../shared/action-bar/action-bar.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from './board/board.component';
import { BoardModalComponent } from './board-modal/board-modal.component';
import { SortPipe } from "../../shared/pipes/sort/sort.pipe";
import { FilterPipe } from "../../shared/pipes/filter/filter.pipe";

@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    BoardModalComponent,
    SortPipe,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    ActionBarModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
