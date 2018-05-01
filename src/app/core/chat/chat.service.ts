import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WsService } from '../ws.service';
import { URLS } from '../urls';
import { TokenStorage } from '../auth/token.storage';

@Injectable()
export class ChatService {


  public messages: Subject<any>;

  constructor(private wsService: WsService,
    private tokenStorage: TokenStorage) {
    this.conncetToChat();
  }

  conncetToChat() {
    const url = URLS.chat + '?Authorization=' + this.tokenStorage.getStoredToken();
    this.messages = this.wsService.connect(url)
  }

  public streamChat(): Observable<any> {
    return this.messages.map((response: MessageEvent) => {
      return JSON.parse(response.data);
    });;
  }

  send(data: any) {
    this.messages.next(data);
  }
}
