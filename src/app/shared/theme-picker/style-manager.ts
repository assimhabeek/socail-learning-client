import {Injectable} from '@angular/core';
import {SLTheme, ThemeStorage} from './theme-storage';


@Injectable()
export class StyleManager {

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


  constructor(private _themeStorage: ThemeStorage) {
  }

  themeInit() {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    }
  }

  setStyle(key: string, href: string) {
    getLinkElementForKey(key).setAttribute('href', href);
  }

  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  installTheme(theme: SLTheme) {
    this.currentTheme = this._getCurrentThemeFromHref(theme.href);

    if (theme.isDefault) {
      this.removeStyle('theme');
    } else {
      this.setStyle('theme', `assets/custom-themes/${theme.href}`);
    }

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

  private _getCurrentThemeFromHref(href: string): SLTheme {
    return this.themes.find(theme => theme.href === href);
  }

}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
