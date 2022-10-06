import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from "./features/tasks/tasks.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { AuthComponent } from "./features/auth/auth.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { LoginGuard } from "./shared/guards/login.guard";
import { HomeComponent } from "./features/home/home.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: TasksComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
