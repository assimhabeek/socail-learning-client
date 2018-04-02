import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  EmailSendComponent, RegisterComponent,
  RegistrationTokenValidationComponent
} from './register/register.component';
import {TermsComponent} from './register/terms.component';
import {PasswordRecoveryComponent, PasswordSentComponent} from './password-recovery/password-recovery.component';
import {NotEqualValidator} from './register/not-equal.directive';
import {LoginComponent} from './login/login.component';
import {IsConnected, IsLoggedIn, IsNotVerified, NotForLoggedUsers} from './router-auth.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from '../../routing.module';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    NotEqualValidator,
    RegistrationTokenValidationComponent,
    PasswordRecoveryComponent,
    PasswordSentComponent,
    TermsComponent,
    EmailSendComponent,
  ],
  entryComponents: [
    TermsComponent
  ],
  providers: [
    IsNotVerified,
    IsLoggedIn,
    IsConnected,
    NotForLoggedUsers]
})
export class AuthModule {
}
