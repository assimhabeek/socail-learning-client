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
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {


  languages: Lang[] = [
    {description: 'English', direction: 'ltr', abb: 'en', defaultLanguage: true},
    {description: 'العربية', direction: 'rtl', abb: 'ar'},
    {description: 'Français', direction: 'ltr', abb: 'fr'}

  ];

  constructor(private languageStorage: LanguageStorage) {
    this.languageStorage.languageInit(this.languages.find((item: Lang) => item.defaultLanguage));
  }


  updateLanguage(lang: Lang) {
    this.languageStorage.updateLanguage(lang);
  }
}
