import {EventEmitter, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from './language-selector.component';


@Injectable()
export class LanguageStorage {
  static storageKey = 'sl-language-storage-current';
  public onLanguageUpdate: EventEmitter<Lang> = new EventEmitter<Lang>();

  constructor(private translate: TranslateService) {
  }


  public languageInit(defaultLanguage: Lang) {
    const languageUsed = this.getStoredLanguage() || defaultLanguage;
    this.translate.use(languageUsed.abb);
    this.onLanguageUpdate.emit(languageUsed);
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
