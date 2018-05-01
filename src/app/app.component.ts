import { Component, OnInit } from '@angular/core';
import { LanguageStorage } from './shared/language-selector/language.storage';
import { Lang } from './shared/language-selector/language-selector.component';
import { UsersService } from './core/auth/users.service';
import { StyleManager } from './shared/theme-picker/style-manager';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
    <div [dir]="dir" [style.height]="'100%'" class="mat-typography">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {

  public dir = 'ltr';


  constructor(lang: LanguageStorage,
    theme: StyleManager,
    private adapter: DateAdapter<any>) {

    theme.themeInit();
    const lan = lang.languageInit();
    this.dir = lan.direction;
    this.adapter.setLocale(lan.abb);

    lang.onLanguageUpdate.subscribe((l: Lang) => {
      this.adapter.setLocale(l.abb);
      this.dir = l.direction;
    });
  }


}
