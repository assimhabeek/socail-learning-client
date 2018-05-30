import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { URLS } from './urls';
import { Friend } from './domain/friend';
@Injectable()
export class FriendService {

  constructor(private _http: HttpService) { }

  public loadFriends() {
    return this._http.getWithAuth(URLS.friend);
  }

  public sendRequest(f: Friend) {
    return this._http.postWithAuth(URLS.friend, f);
  }

  public sendAnswer(f: Friend) {
    return this._http.putWithAuth(URLS.friend, f);
  }

  public deleteRequest(id: number) {
    return this._http.deleteWithAuth(URLS.friend, {
      params: {
        id: id
      }
    });
  }

}
