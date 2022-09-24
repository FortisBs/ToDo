import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { ActionBarModule } from "../../shared/action-bar/action-bar.module";

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    ActionBarModule
  ]
})
export class BoardModule { }
