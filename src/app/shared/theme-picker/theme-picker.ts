import {Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, HostBinding} from '@angular/core';
import {StyleManager} from '../style-manager/style-manager';
import {ThemeStorage, SLSiteTheme} from './theme-storage/theme-storage';
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
  currentTheme;

  themes = [
    {
      primary: '#00BCD4',
      accent: '#009688',
      href: 'cyan-teal.css',
      isDefault: true,
      isDark: false,
    },
    {
      primary: '#00BCD4',
      accent: '#009688',
      href: 'cyan-teal-dark.css',
      isDark: true,
    },
    {
      primary: '#43a047',
      accent: '#607d8b',
      href: 'green-bluegrey.css',
      isDark: false,
    },
    {
      primary: '#43a047',
      accent: '#607d8b',
      href: 'green-bluegrey-dark.css',
      isDark: true,
    },
    {
      primary: '#f44336',
      accent: '#9C27B0',
      href: 'red-purple.css',
      isDark: false,
    },
    {
      primary: '#f44336',
      accent: '#9C27B0',
      href: 'red-purple-dark.css',
      isDark: true,
    },
    {
      primary: '#d84315',
      accent: '#795548',
      href: 'orange-brown.css',
      isDark: false,
    },
    {
      primary: '#d84315',
      accent: '#ffc107',
      href: 'orange-amber-dark.css',
      isDark: true,
    }
  ];

  constructor(public styleManager: StyleManager,
              private _themeStorage: ThemeStorage) {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    }
  }

  installTheme(theme: SLSiteTheme) {
    this.currentTheme = this._getCurrentThemeFromHref(theme.href);

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `assets/${theme.href}`);
    }

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

  private _getCurrentThemeFromHref(href: string): SLSiteTheme {
    return this.themes.find(theme => theme.href === href);
  }
}

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
