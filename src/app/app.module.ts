import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from "./features/auth/auth.module";
import { DashboardModule } from "./features/dashboard/dashboard.module";
import { TasksModule } from "./features/tasks/tasks.module";
import { HomeModule } from "./features/home/home.module";
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./features/auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    TasksModule,
    HomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
