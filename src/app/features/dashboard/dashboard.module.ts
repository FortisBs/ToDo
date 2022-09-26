import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ActionBarModule } from "../../shared/action-bar/action-bar.module";
import { AddBoardComponent } from './modals/add-board/add-board.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BoardComponent } from './board/board.component';
import { EditBoardComponent } from './modals/edit-board/edit-board.component';
import { FilterPipe } from "../../shared/pipes/filter/filter.pipe";
import { SortPipe } from "../../shared/pipes/sort/sort.pipe";

@NgModule({
  declarations: [
    DashboardComponent,
    AddBoardComponent,
    BoardComponent,
    EditBoardComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    ActionBarModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
