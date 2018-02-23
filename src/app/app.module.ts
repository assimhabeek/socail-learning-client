import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ThemePickerModule} from './shared/theme-picker/theme-picker';
import {ThemeStorage} from './shared/theme-picker/theme-storage/theme-storage';
import {LoginComponent} from './core/login/login.component';
import {RoutingModule} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RoutingModule,
    ThemePickerModule,
    HttpClientModule
  ],
  providers: [ThemeStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
}
