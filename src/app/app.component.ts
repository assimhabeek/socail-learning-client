import {Component} from '@angular/core';
import {LanguageStorage} from './shared/language-selector/language.storage';
import {Lang} from './shared/language-selector/language-selector.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public dir = 'ltr';


  constructor(lang: LanguageStorage) {
    this.dir = lang.languageInit().direction;
    lang.onLanguageUpdate.subscribe((l: Lang) => {
      this.dir = l.direction;
    });
  }


}
