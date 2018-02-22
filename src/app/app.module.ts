import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {ThemePickerModule} from './shared/theme-picker/theme-picker';
import {ThemeStorage} from './shared/theme-picker/theme-storage/theme-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ThemePickerModule,
  ],
  providers: [ThemeStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
}
