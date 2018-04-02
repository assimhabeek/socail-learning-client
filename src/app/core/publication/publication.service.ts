import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {URLS} from '../urls';
import {WsService} from '../ws.service';

@Injectable()
export class PublicationService {

  constructor(private _http: HttpService,
              private _ws: WsService) {
  }

  public getPublications(page: number) {
    return this._http.get(URLS.publications, {params: {page: page}});
  }

  public getStreamedPublications() {
    return this._ws.connect(URLS.publications + '/stream');
  }

  public getAttachments(id: number) {
    return this._http.get(URLS.attachments, {params: {publicationId: id}});
  }

  public getComments(id: number) {
    return this._http.get(URLS.comments, {params: {publicationId: id}});
  }

}
