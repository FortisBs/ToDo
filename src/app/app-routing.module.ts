import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'dashboard/:id', loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'manage', loadChildren: () => import('./features/manage/manage.module').then(m => m.ManageModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
