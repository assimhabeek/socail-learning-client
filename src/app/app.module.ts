import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {RoutingModule} from './routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IndexComponent, UserSettingMenuComponent} from './core/index/index.component';
import {HttpService} from './core/http.service';
import {UsersService} from './core/auth/users.service';
import {TokenStorage} from './core/auth/token.storage';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TermsComponent} from './core/auth/register/terms.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import {NoConnectionComponent} from './core/no-connection/no-connection.component';
import {AccountComponent} from './core/account/account.component';
import {AuthModule} from './core/auth/auth.module';
import {LanguageSelectorModule} from './shared/language-selector/language-selector.module';
import {ThemePickerModule} from './shared/theme-picker/theme-picker.module';
import {HomeComponent} from './core/home/home.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {SuccessMessageComponent} from './core/success-message/success-message.component';
import {SpecialtiesService} from './core/specialty/specialties.service';
import {PublicationComponent} from './core/publication/publication.component';
import {Attachments} from './core/domain/attachments';
import {PublicationService} from './core/publication/publication.service';
import {TimeAgoPipe} from './shared/time-ago.pipe';
import {WsService} from './core/ws.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NoConnectionComponent,
    UserSettingMenuComponent,
    AccountComponent,
    HomeComponent,
    PublicationComponent,
    SuccessMessageComponent,
    TimeAgoPipe
  ],
  entryComponents: [
    SuccessMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    RoutingModule,
    StorageServiceModule,
    ThemePickerModule,
    ImageCropperModule,
    LanguageSelectorModule,
    FlexLayoutModule,
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    HttpService,
    TokenStorage,
    UsersService,
    WsService,
    SpecialtiesService,
    PublicationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

