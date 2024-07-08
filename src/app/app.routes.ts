import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirecciona a login al inicio
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)},
];
