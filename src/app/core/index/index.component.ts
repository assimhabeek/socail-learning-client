import {ChangeDetectorRef, Component, HostBinding, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {fadeListItems, slideInLeftAnimation} from '../../shared/animations';


interface MenuItem {
  description: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [slideInLeftAnimation, fadeListItems]
})

export class IndexComponent implements OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';


  mobileQuery: MediaQueryList;
  menuItems: MenuItem[] = [];
  items = [];


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  showItems() {
    this.menuItems = [
      {description: 'SHARE_CONTENT_DESCRIPTION', icon: 'share', title: 'SHARE_CONTENT'},
      {description: 'SHARE_CONTENT_DESCRIPTION', icon: 'share', title: 'SHARE_CONTENT'},
      {description: 'SHARE_CONTENT_DESCRIPTION', icon: 'share', title: 'SHARE_CONTENT'},
      {description: 'SHARE_CONTENT_DESCRIPTION', icon: 'share', title: 'SHARE_CONTENT'},
      {description: 'SHARE_CONTENT_DESCRIPTION', icon: 'share', title: 'SHARE_CONTENT'},
      {description: 'SHARE_CONTENT_DESCRIPTION', icon: 'share', title: 'SHARE_CONTENT'},
    ];
  }


  hideItems() {
    this.menuItems = [];
  }

  toggleMenu() {
    this.menuItems.length ? this.hideItems() : this.showItems();
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
