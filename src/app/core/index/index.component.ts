import { ChangeDetectorRef, Inject, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { fadeListItems, routerAnimation, slideSideNav } from '../../shared/animations';
import { UsersService } from '../auth/users.service';
import { User } from '../domain/user';
import { Router } from '@angular/router';
import { Category } from '../domain/category';
import { CategoriesService } from '../categories.service';
import { NotificationService, Notification } from '../notification.service';
import { ChatService } from '../chat/chat.service';
import { PublicationPreviewComponent } from '../publication/publication.component';
import { PublicationService } from '../publication/publication.service';

class MenuItem {
  description: string;
  icon: string;
  title: string;
  router: string;
  constructor(description: string, icon: string, title: string, router: string) {
    this.description = description;
    this.icon = icon;
    this.title = title;
    this.router = router;
  }

}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [routerAnimation, fadeListItems, slideSideNav]
})

export class IndexComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;


  user: any = {};
  showConfirmBar = true;
  mobileQuery: MediaQueryList;
  fullItems: MenuItem[] = [
    new MenuItem('PUBLICATIONS_DESCRIPTION', 'book', 'PUBLICATIONS', '/index'),
    new MenuItem('MEMO_DESCRIPTION', 'library_booksr', 'MEMO', '/index/memo'),
    new MenuItem('FAQ_DESCRIPTION', 'question_answer', 'FAQ', '/index/faq'),
    new MenuItem('CHAT_DESCRIPTION', 'chat', 'CHAT', '/index/chat'),
    new MenuItem('VALIATION_DESCRIPTION', 'report', 'VALIATION', '/index/val'),
    new MenuItem('CATEGORY_DESCRIPTION', 'view_array', 'CATEGORY', '/index/cat'),
    new MenuItem('SPECIALTY_DESCRIPTION', 'view_week', 'SPECIALTY', '/index/spe'),
    new MenuItem('MODULE_DESCRIPTION', 'view_module', 'MODULE', '/index/mod')
  ]
  menuItems: MenuItem[] = [];
  adminItems: MenuItem[] = [];

  items = [];


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private usersService: UsersService,
    private chatService: ChatService,
    private publicationService: PublicationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.loadUser();
    this.chatService.conncetToChat();
    this.publicationService.listenToStream();
  }


  showItems() {
    this.menuItems = this.fullItems.slice(0, 4);
    this.adminItems = this.fullItems.slice(4, 8);
  }

  loadUser() {
    this.usersService.user
      .subscribe((user: User) => {
        this.user = user;
      });
  }


  hideItems() {
    this.menuItems = [];
    this.adminItems = [];
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


