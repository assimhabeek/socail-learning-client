import {Component, OnInit} from '@angular/core';
import {LanguageStorage} from './language.storage';

export interface Lang {
  description: string;
  direction: string;
  abb: string;
  defaultLanguage?: boolean;
}


@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent {


  languages: Lang[];

  constructor(private languageStorage: LanguageStorage) {
    this.languages = this.languageStorage.languages;
  }


  updateLanguage(lang: Lang) {
    this.languageStorage.updateLanguage(lang);
  }
}
