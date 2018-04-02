import {Injectable, EventEmitter} from '@angular/core';

export interface SLTheme {
  href: string;
  accent: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
}


@Injectable()
export class ThemeStorage {
  static storageKey = 'sl-theme-storage-current';

  public onThemeUpdate: EventEmitter<SLTheme> = new EventEmitter<SLTheme>();

  public storeTheme(theme: SLTheme) {
    try {
      window.localStorage[ThemeStorage.storageKey] = JSON.stringify(theme);
    } catch (e) { }

    this.onThemeUpdate.emit(theme);
  }

  public getStoredTheme(): SLTheme {
    try {
      return JSON.parse(window.localStorage[ThemeStorage.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

  public clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch (e) { }
  }
}
