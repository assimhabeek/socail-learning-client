import {Component, Input, OnInit} from '@angular/core';
import {Publication} from '../domain/publication';
import {User} from '../domain/user';
import {Comment} from '../domain/comment';
import {PublicationService} from './publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  @Input() publication: Publication;
  @Input() currentUser: User;
  private attachmentsAreFetched = false;
  private commentsAreFetched = false;

  newComment: any = {};

  constructor(private publicationService: PublicationService) {
  }

  ngOnInit() {
    this.newComment.user = this.currentUser;
  }


  commented(state) {
    if (state) {
      console.log(this.newComment);
    }
  }

  attachmentOpened() {
    if (!this.attachmentsAreFetched) {
      this.attachmentsAreFetched = true;
      this.publicationService.getAttachments(this.publication.id)
        .subscribe((res) => {
          this.publication.attachments = res;
        });
    }
  }

  commentOpened() {
    if (!this.commentsAreFetched) {
      this.commentsAreFetched = true;
      this.publicationService.getComments(this.publication.id)
        .subscribe((res) => {
          console.log(res);
          this.publication.comments = res;
        });
    }
  }


}
