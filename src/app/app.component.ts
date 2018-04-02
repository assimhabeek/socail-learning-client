import {Component, OnInit} from '@angular/core';
import {LanguageStorage} from './shared/language-selector/language.storage';
import {Lang} from './shared/language-selector/language-selector.component';
import {UsersService} from './core/auth/users.service';
import {StyleManager} from './shared/theme-picker/style-manager';


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
              theme: StyleManager) {
    theme.themeInit();
    this.dir = lang.languageInit().direction;
    lang.onLanguageUpdate.subscribe((l: Lang) => {
      this.dir = l.direction;
    });
  }


}
