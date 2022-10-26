import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from "@angular/router";

import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref
  ],
  exports: [HeaderComponent]
})
export class CoreModule {}
