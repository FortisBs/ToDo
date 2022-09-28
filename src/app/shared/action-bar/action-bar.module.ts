import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from "./action-bar.component";
import { RouterLinkWithHref } from "@angular/router";

@NgModule({
  declarations: [ActionBarComponent],
  exports: [
    ActionBarComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
  ]
})
export class ActionBarModule { }
