import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { URLS } from '../urls';
import { WsService } from '../ws.service';
import { Attachment } from '../domain/attachments';
import { Publication } from '../domain/publication';
import { NotificationService, Notification } from '../notification.service';
import { Subject } from 'rxjs';

const removeFalsy = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] != null) { newObj[prop] = obj[prop]; }
  });
  return newObj;
};

const formatDate = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (prop == 'date') {
      newObj[prop] = obj[prop].format("YYYY-MM-DD HH:mm:ss");
    } else {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

@Injectable()
export class PublicationService {


  public strem: EventEmitter<any> = new EventEmitter();
  public publicationStream: any;
  private conncetion: Subject<any>;

  constructor(private _http: HttpService,
    public notificationService: NotificationService,
    private _ws: WsService) {
  }

  public getPublications(filter: any) {
    return this._http.getWithAuth(URLS.publications, {
      params: formatDate(removeFalsy(filter))
    });
  }


  close() {
    this.conncetion.next('close');
  }


  listenToStream() {
    this.conncetion = this.getStreamedPublications();
    this.publicationStream = this.conncetion.subscribe(r => {
      if (isNaN(r.data)) {
        try {
          const pub: Publication = JSON.parse(r.data);
          this.notificationService.sendNotification(new Notification(pub.title, pub.id, pub.user, false));
        } catch (e) {
          console.log(e);
        }
      }
      this.strem.emit(r.data);
    });
  }

  public getPublication(id: number) {
    return this._http.get(URLS.publications, { params: { id: id } });
  }
  public getPublicationExtanded(id: number) {
    return this._http.get(URLS.publications, { params: { eid: id } });
  }


  public getPublicationsByUser(id: number) {
    return this._http.get(URLS.publications, { params: { user: id } });
  }

  public getReportedPublications() {
    return this._http.get(URLS.publications + '/reported');
  }


  public getStreamedPublications() {
    return this._ws.connect(URLS.publications + '/stream');
  }

  public getAttachments(id: number) {
    return this._http.get(URLS.attachments, { params: { publicationId: id } });
  }

  public getComments(id: number) {
    return this._http.get(URLS.comments, { params: { publicationId: id } });
  }

  public getStreamedComment(id: number) {
    return this._ws.connect(URLS.comments + `/stream?publicationId=${id}`);
  }

  public addPublication(publication: Publication) {
    return this._http.postWithAuth(URLS.publications, publication, { responseType: 'text' });
  }

  public editPublication(publication: Publication) {
    return this._http.putWithAuth(URLS.publications, publication, { responseType: 'text' });
  }

  public addComment(comment: Comment) {
    return this._http.postWithAuth(URLS.comments, comment, { responseType: 'text' });
  }

  public editComment(comment: Comment) {
    return this._http.putWithAuth(URLS.comments, comment, { responseType: 'text' });
  }

  public addAttachment(attachment: Attachment) {
    return this._http.postWithAuth(URLS.attachments, attachment, { responseType: 'text' });
  }

  public editAttachment(attachment: Attachment) {
    return this._http.putWithAuth(URLS.attachments, attachment, { responseType: 'text' });
  }

  public deletePublication(id: number) {
    return this._http.deleteWithAuth(URLS.publications, {
      responseType: 'text', params: { id: id }
    });
  }

  public deleteAttachment(id: number) {
    return this._http.deleteWithAuth(URLS.attachments, {
      responseType: 'text', params: { id: id }
    });
  }

  public deleteComment(id: number) {
    return this._http.deleteWithAuth(URLS.comments, {
      responseType: 'text', params: { id: id }
    });
  }

  public markAsBest(publicationId: number, comment: number) {
    return this._http.postWithAuth(URLS.comments + URLS.markBest, {}, {
      responseType: 'text',
      params: {
        publicationId: publicationId,
        commentId: comment
      }
    });
  }

}
