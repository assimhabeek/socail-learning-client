import {EventEmitter, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from './language-selector.component';


@Injectable()
export class LanguageStorage {
  static storageKey = 'sl-language-storage-current';
  public onLanguageUpdate: EventEmitter<Lang> = new EventEmitter<Lang>();

  languages: Lang[] = [
    {description: 'English', direction: 'ltr', abb: 'en', defaultLanguage: true},
    {description: 'العربية', direction: 'rtl', abb: 'ar'},
    {description: 'Français', direction: 'ltr', abb: 'fr'}

  ];

  constructor(private translate: TranslateService) {
  }


  public languageInit(): Lang {
    const languageUsed = this.getStoredLanguage() || this.languages.find(item => item.defaultLanguage);
    this.translate.setDefaultLang('en');
    this.translate.use(languageUsed.abb);
    return languageUsed;
  }

  public updateLanguage(language: Lang) {
    this.translate.use(language.abb);
    this.onLanguageUpdate.emit(language);
    this.storeLanguage(language);
  }


  public storeLanguage(language: Lang) {
    try {
      window.localStorage[LanguageStorage.storageKey] = JSON.stringify(language);
    } catch (e) {
      console.log(e);
    }

  }

  public getStoredLanguage(): Lang {
    try {
      return JSON.parse(window.localStorage[LanguageStorage.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

}
