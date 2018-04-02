import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {ThemePickerComponent} from './theme-picker';
import {ThemeStorage} from './theme-storage';
import {StyleManager} from './style-manager';
import {
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    TranslateModule,
    CommonModule
  ],
  exports: [ThemePickerComponent],
  declarations: [ThemePickerComponent],
  providers: [StyleManager, ThemeStorage],
})
export class ThemePickerModule {
}
