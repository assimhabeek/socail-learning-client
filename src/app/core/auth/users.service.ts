import { Injectable } from '@angular/core';
import { User } from '../domain/user';
import { URLS } from '../urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { HttpService } from '../http.service';
import { TokenStorage } from './token.storage';

@Injectable()
export class UsersService {

  public user: Observable<any> = this.tokenStorage.getStoredToken() == null
    ? this._http.get(URLS.users).share()
    : this._http.getWithAuth(URLS.users).share();

  constructor(private _http: HttpService,
    private tokenStorage: TokenStorage) {
  }

  login(user: User): Observable<any> {
    const options = { responseType: 'text' };
    return this._http.post(URLS.login, user, options);
  }


  isLoggedIn() {
    return this.tokenStorage.getStoredToken() == null
      ? this._http.get(URLS.users).share()
      : this._http.getWithAuth(URLS.users).map((user) =>
        user != null,
        (e) => { console.log(e) });
  }

  isAdmin() {
    return this.tokenStorage.getStoredToken() == null
      ? this._http.get(URLS.users).share()
      : this._http.getWithAuth(URLS.users).map((user) =>
        user ? user.isAdmin : false,
        (e) => { console.log(e) });
  }

  logout() {
    this.tokenStorage.removeToken();
    this.updateUserState();
  }

  register(user: User): Observable<any> {
    return this._http.post(URLS.register, user, { responseType: 'text' });
  }

  sendRegistrationEmailAgain() {
    return this._http.getWithAuth(URLS.sendEmail, { responseType: 'text' });
  }

  sendPasswordToEmail(email: string) {
    return this._http.getWithAuth(URLS.password, { responseType: 'text', params: { email: email } });
  }


  validateRegistrationToken(token: string) {
    return this._http.getWithAuth(URLS.register, { responseType: 'text', params: { token: token } });
  }


  findUsedUsername(username: string): Observable<any> {
    return this.getByValue('username', username);
  }

  findUsedEmail(username: string): Observable<any> {
    return this.getByValue('email', username);
  }

  updateUserState() {
    this.user = this._http.getWithAuth(URLS.users).share();
  }


  storeToken(token: string, remmberMe: boolean) {
    this.tokenStorage.storeToken(token, remmberMe);
    this.updateUserState();
  }

  private getByValue(name: string, value: string): Observable<any> {
    const params: {} = {};
    params[name] = value;
    const options: {} = { responseType: 'text', params: params };
    return this._http.get(URLS.register, options);
  }

  public updateUserInfo(user: User) {
    return this._http.put(URLS.users, user, { responseType: 'text' });
  }

  public updatePassword(password: any) {
    return this._http.put(URLS.password, password, { responseType: 'text' });
  }

  public getUsers() {
    return this._http.get(URLS.users + '/all');
  }

  public getUsersByFilterAndPage(page: number, filter: string) {
    return this._http.get(URLS.users, { params: { filter: filter, page: page } });
  }

  public getUserById(id: number) {
    return this._http.get(URLS.users, { params: { id: id } });
  }

  public getReportedUsers() {
    return this._http.get(URLS.users + '/reported');
  }


  public deleteAccount(id: number) {
    return this._http.deleteWithAuth(URLS.users, { params: { id: id }, responseType: 'text' });
  }

}
