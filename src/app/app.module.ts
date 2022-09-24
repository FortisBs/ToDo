import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { DashboardModule } from "./features/dashboard/dashboard.module";
import { BoardModule } from "./features/board/board.module";
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BoardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
