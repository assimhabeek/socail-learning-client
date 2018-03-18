import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {

  private httpUrl = 'http://' + environment.socket;
  private webSocket = 'ws://' + environment.socket;

  constructor(public http: HttpClient) {
  }

  post(url, data, options ?): Observable<any> {
    return this.http.post(this.httpUrl + url, data, options);
  }

  get(url, args): Observable<any> {
    return this.http.get(this.httpUrl + url, args);
  }


}
