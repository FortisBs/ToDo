import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "./toolbar.component";
import { RouterLinkWithHref } from "@angular/router";
import { FilterPipe } from "../pipes/filter/filter.pipe";
import { SortPipe } from "../pipes/sort/sort.pipe";
import { ToolbarService } from "./toolbar.service";

@NgModule({
  declarations: [
    ToolbarComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
  ],
  exports: [
    ToolbarComponent,
    FilterPipe,
    SortPipe
  ],
  providers: [ToolbarService]
})
export class ToolbarModule { }
