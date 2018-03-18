import {Routes} from '@angular/router';
import {LoginComponent} from './core/login/login.component';
import {RegisterComponent} from './core/register/register.component';
import {IndexComponent} from './core/index/index.component';

export const appRoutes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', pathMatch: 'full', redirectTo: '/index'},
  {path: '**', component: IndexComponent}
];

