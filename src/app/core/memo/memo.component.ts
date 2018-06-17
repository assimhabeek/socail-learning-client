import { Component, HostBinding, OnInit } from '@angular/core';
import { PublicationService } from '../publication/publication.service';
import { fadeAnimation } from '../../shared/animations';
import { Publication } from '../domain/publication';
import { User } from '../domain/User';
import { UsersService } from '../auth/users.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
  animations: [fadeAnimation]
})

export class MemoComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public publications: Publication[] = [];
  public currentUser: User;
  publicationEnd = false;
  public publicationSize = 1;
  public openAttachments = false;
  private attachmentsAreFetched = false;
  public useRecaptch = window.location.protocol.indexOf('https') > -1;
  public total;

  filter: any = {};

  constructor(public publicationsService: PublicationService,
    public usersService: UsersService) { }

  ngOnInit() {
    this.filter.page = 0;
    this.filter.category = 3;
    this.loadUser();

    this.loadPublications();
  }

  loadUser() {
    this.usersService.user.subscribe(res => {
      this.currentUser = res;
    });
  }

  showReCap(pub) {
    if (!this.useRecaptch) {
      this.attachmentOpened(pub);
    } else {
      this.openAttachments = true;
    }
  }

  zoomIn() {
    this.publicationSize = this.publicationSize == 3 ? this.publicationSize : this.publicationSize + 0.2;
  }

  zommOut() {
    this.publicationSize = this.publicationSize == 0.2 ? this.publicationSize : this.publicationSize - 0.2;
  }

  pageChanged($event) {
    this.filter.page = $event.pageIndex;
    this.loadPublications();
  }


  attachmentOpened(pub) {
    if (!this.attachmentsAreFetched) {
      this.attachmentsAreFetched = true;
      this.publicationsService.getAttachments(pub.id)
        .subscribe((res) => {
          pub.attachments = res;
        });
    }
  }

  loadPublications() {
    this.publicationsService.getPublications(this.filter)
      .subscribe(res => {
        this.publications = res[1];
        this.total = res[0];
      });
  }

  loadMore() {
    this.filter.page += 1;
    this.loadPublications();
  }


}
