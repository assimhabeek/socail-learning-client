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
import { IsConnected, IsLoggedIn, IsNotVerified, NotForLoggedUsers, IsAdmin } from './core/auth/router-auth.service';
import { NoConnectionComponent } from './core/no-connection/no-connection.component';
import { AccountComponent } from './core/account/account.component';
import { HomeComponent } from './core/home/home.component';
import { PublicationFormComponent, PublicationPreviewComponent } from './core/publication/publication.component';
import { FaqComponent } from './core/faq/faq.component';
import { ChatComponent } from './core/chat/chat.component'
import { MemoComponent } from './core/memo/memo.component';
import { ProfileComponent } from './core/profile/profile.component';
import { ValComponent } from './core/val/val.component';
import { CatComponent } from './core/cat/cat.component';
import { ModComponent } from './core/mod/mod.component';
import { SpeComponent } from './core/spe/spe.component';
import { ContactsComponent } from './core/chat/contacts.component';
import { VedioCallerComponent } from './core/chat/vedio-caller.component';

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
      { path: 'accounts', component: AccountComponent, canActivate: [IsLoggedIn] },
      { path: 'memo', component: MemoComponent },
      { path: 'faq', component: FaqComponent },
      {
        path: 'chat', component: ChatComponent, canActivate: [IsLoggedIn],
        children: [
          { path: 'contacts', component: ContactsComponent },
          { path: '', redirectTo: '/index/chat', pathMatch: 'full' },
          { path: '**', redirectTo: '/index/chat', pathMatch: 'full' }]
      },
      { path: 'vedioCall', component: VedioCallerComponent },
      { path: 'publicationForm/:id', component: PublicationFormComponent, canActivate: [IsLoggedIn] },
      { path: 'publicationPreview/:id', component: PublicationPreviewComponent },
      { path: 'profilePreview/:id', component: ProfileComponent },
      { path: 'val', component: ValComponent, canActivate: [IsAdmin] },
      { path: 'cat', component: CatComponent, canActivate: [IsAdmin] },
      { path: 'spe', component: SpeComponent, canActivate: [IsAdmin] },
      { path: 'mod', component: ModComponent, canActivate: [IsAdmin] },
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

