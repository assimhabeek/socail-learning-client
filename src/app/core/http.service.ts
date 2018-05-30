import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenStorage } from './auth/token.storage';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {

  private httpUrl = 'https://' + environment.socket;

  constructor(public http: HttpClient,
    public tokenStorage: TokenStorage) {
  }

  post(url, data, options?): Observable<any> {
    return this.http.post(this.httpUrl + url, data, options);
  }

  get(url, args?): Observable<any> {
    return this.http.get(this.httpUrl + url, args);
  }

  put(url, data, opti?): Observable<any> {
    return this.http.put(this.httpUrl + url, data, this.addAuthHeader(opti));
  }

  postWithAuth(url, data, options?): Observable<any> {
    return this.http.post(this.httpUrl + url, data, this.addAuthHeader(options));
  }

  getWithAuth(url, args?): Observable<any> {
    return this.get(url, this.addAuthHeader(args));
  }

  putWithAuth(url, data, options?): Observable<any> {
    return this.http.put(this.httpUrl + url, data, this.addAuthHeader(options));
  }

  deleteWithAuth(url, args?): Observable<any> {
    return this.http.delete(this.httpUrl + url, this.addAuthHeader(args));
  }

  addAuthHeader(opti) {
    const options: any = opti || {};
    const headers = options.headers != null ? options.headers : {};
    if (this.tokenStorage.getStoredToken() != null) {
      headers['Authorization'] = this.tokenStorage.getStoredToken();
    }
    options.headers = headers;
    return options;
  }
}
