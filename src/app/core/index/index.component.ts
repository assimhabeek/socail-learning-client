import {ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {fadeListItems, slideInLeftAnimation} from '../../shared/animations';
import {UsersService} from '../auth/users.service';
import {User} from '../domain/user';
import {Router} from '@angular/router';


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

export class IndexComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;


  user = {};
  showConfirmBar = true;
  mobileQuery: MediaQueryList;
  menuItems: MenuItem[] = [];
  items = [];


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router,
              private usersService: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.usersService.user
      .subscribe((user: User) => {
        this.user = user;
      });
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


  confirm() {
    this.usersService.sendRegistrationEmailAgain().subscribe();
    this.router.navigate(['/emailSend']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}


@Component({
  selector: 'app-user-setting-menu',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="settingMenu" tabindex="-1">
      <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #settingMenu="matMenu" xPosition="before">
      <a mat-menu-item routerLink="./accounts">
        <mat-icon>account_circle</mat-icon>
        <span>{{'MANAGE_ACCOUNT' | translate}} </span>
      </a>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="logout()">
        <mat-icon>power_settings_new</mat-icon>
        <span>{{'LOGOUT' | translate}} </span>
      </button>
    </mat-menu>`
})

export class UserSettingMenuComponent {

  constructor(private userService: UsersService,
              private router: Router) {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
