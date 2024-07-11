import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirecciona a login al inicio
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)},
  { path:'admin',loadChildren:()=>import('./admin/admin.module').then((m) => m.AdminModule)},
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];
