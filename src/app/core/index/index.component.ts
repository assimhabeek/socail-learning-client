import { ChangeDetectorRef, Inject, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { fadeListItems, slideInLeftAnimation } from '../../shared/animations';
import { UsersService } from '../auth/users.service';
import { User } from '../domain/user';
import { Router } from '@angular/router';
import { Category } from '../domain/category';
import { CategoriesService } from '../categories.service';
import { NotificationService, Notification } from '../notification.service';
import { ChatService } from '../chat/chat.service';

class MenuItem {
  description: string;
  icon: string;
  title: string;
  router: string;
  forAdmin: boolean;

  constructor(description: string, icon: string, title: string, router: string, forAdmin) {
    this.description = description;
    this.icon = icon;
    this.title = title;
    this.router = router;
    this.forAdmin = forAdmin;
  }

}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [slideInLeftAnimation, fadeListItems]
})

export class IndexComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;


  user: any = {};
  showConfirmBar = true;
  mobileQuery: MediaQueryList;
  menuItems: MenuItem[] = [];
  items = [];


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private usersService: UsersService,
    private chatService: ChatService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.loadUser();
  }


  showItems() {
    this.menuItems = [
      new MenuItem('PUBLICATIONS_DESCRIPTION', 'book', 'PUBLICATIONS', '/index', false),
      new MenuItem('MEMO_DESCRIPTION', 'library_booksr', 'MEMO', '/index/memo', false),
      new MenuItem('FAQ_DESCRIPTION', 'question_answer', 'FAQ', '/index/faq', false),
      new MenuItem('CHAT_DESCRIPTION', 'chat', 'CHAT', '/index/chat', false),
      new MenuItem('VALIATION_DESCRIPTION', 'report', 'VALIATION', '/index/val', true),
      new MenuItem('CATEGORY_DESCRIPTION', 'report', 'CATEGORY', '/index/cat', true),
      new MenuItem('SPECIALTY_DESCRIPTION', 'report', 'SPECIALTY', '/index/spe', true),
      new MenuItem('MODULE_DESCRIPTION', 'report', 'MODULE', '/index/mod', true),

    ];
  }

  loadUser() {
    this.usersService.user
      .subscribe((user: User) => {
        this.user = user;
      });
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


