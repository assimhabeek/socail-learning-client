import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ThemePickerModule} from './shared/theme-picker/theme-picker';
import {ThemeStorage} from './shared/theme-picker/theme-storage/theme-storage';
import {LoginComponent} from './core/login/login.component';
import {RoutingModule} from './routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './core/register/register.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguageSelectorComponent} from './shared/language-selector/language-selector.component';
import {LanguageStorage} from './shared/language-selector/language.storage';
import {IndexComponent} from './core/index/index.component';
import {HttpService} from './core/http.service';
import {UsersService} from './core/users.service';
import {TokenStorage} from './core/token.storage';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LanguageSelectorComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RoutingModule,
    ThemePickerModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ThemeStorage, LanguageStorage, HttpService, UsersService, TokenStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
