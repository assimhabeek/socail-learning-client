import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import {
  EmailSendComponent, RegisterComponent,
  RegistrationTokenValidationComponent
} from './core/auth/register/register.component';
import { IndexComponent } from './core/index/index.component';
import {
  PasswordRecoveryComponent,
  PasswordSentComponent
} from './core/auth/password-recovery/password-recovery.component';
import { IsConnected, IsLoggedIn, IsNotVerified, NotForLoggedUsers } from './core/auth/router-auth.service';
import { NoConnectionComponent } from './core/no-connection/no-connection.component';
import { AccountComponent } from './core/account/account.component';
import { HomeComponent } from './core/home/home.component';
import { PublicationFormComponent } from './core/publication/publication.component';
import { FaqComponent } from './core/faq/faq.component';
import { ChatComponent } from './core/chat/chat.component'

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotForLoggedUsers] },
  { path: 'register', component: RegisterComponent, canActivate: [NotForLoggedUsers] },
  { path: 'emailSend', component: EmailSendComponent, canActivate: [IsNotVerified] },
  { path: 'tokenValidation/:token', component: RegistrationTokenValidationComponent },
  { path: 'passwordRecovery', component: PasswordRecoveryComponent },
  { path: 'passwordSent', component: PasswordSentComponent }
];

export const appRoutes: Routes = [
  {
    path: 'index', component: IndexComponent, canActivate: [IsConnected],
    children: [
      { path: 'accounts', component: AccountComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'publicationForm/:id', component: PublicationFormComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', pathMatch: 'full', redirectTo: '' }
    ]
  },
  ...authRoutes,
  { path: 'noConnection', component: NoConnectionComponent },
  { path: '', pathMatch: 'full', redirectTo: '/index' },
  { path: '**', component: IndexComponent }
]
  ;

