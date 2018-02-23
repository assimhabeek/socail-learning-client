import {Routes} from '@angular/router';
import {LoginComponent} from './core/login/login.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];

