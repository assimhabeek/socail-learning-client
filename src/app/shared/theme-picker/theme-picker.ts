import {Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, HostBinding} from '@angular/core';
import {StyleManager} from './style-manager';
import {ThemeStorage, SLTheme} from './theme-storage';
import {
  MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';


@Component({
  selector: 'app-theme-picker',
  templateUrl: 'theme-picker.html',
  styleUrls: ['theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemePickerComponent {
  @HostBinding('attr.aria-hidden') ariaHidden = true;

  themes: SLTheme[];

  constructor(public styleManager: StyleManager) {
    this.themes = this.styleManager.themes;
  }

  installTheme(theme: SLTheme) {
    this.styleManager.installTheme(theme);
  }
}

