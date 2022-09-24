import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from "./action-bar.component";

@NgModule({
  declarations: [ActionBarComponent],
  exports: [
    ActionBarComponent
  ],
  imports: [CommonModule]
})
export class ActionBarModule { }
