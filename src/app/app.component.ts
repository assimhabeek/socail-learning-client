import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {LanguageStorage} from './shared/language-selector/language.storage';
import {Lang} from './shared/language-selector/language-selector.component';
import {MediaMatcher} from '@angular/cdk/layout';

interface MenuItem {
  description: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public dir;
  mobileQuery: MediaQueryList;

  menuItems: MenuItem[] = [
    {description: 'SHARE_CONTENT_DESCRIPTION', icon: 'share', title: 'SHARE_CONTENT'}
  ];


  private _mobileQueryListener: () => void;


  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              languageStorage: LanguageStorage,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    iconRegistry.addSvgIcon('sl-logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/social-logo.svg'));
    languageStorage.onLanguageUpdate.subscribe((language: Lang) => {
      this.dir = language.direction;
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
