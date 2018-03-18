import {Injectable} from '@angular/core';

@Injectable()
export class TokenStorage {

  private static storageKey = 'UserToken';

  constructor() {
  }


  public storeToken(token: string) {
    try {
      window.localStorage[TokenStorage.storageKey] = token;
    } catch (e) {
      console.log(e);
    }

  }

  public getStoredToken(): string {
    try {
      return JSON.parse(window.localStorage[TokenStorage.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

}
