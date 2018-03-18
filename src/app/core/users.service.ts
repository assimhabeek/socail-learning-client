import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {User} from './domain/user';
import {URLS} from './urls';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private _http: HttpService) {
  }

  login(user: User): Observable<any> {
    const options = {responseType: 'text'};
    return this._http.post(URLS.login, user, options);
  }

  register(user: User): any {
    return this._http.post(URLS.register, user);
  }

}
