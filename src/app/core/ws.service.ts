import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class WsService {

  private webSocket = 'ws://' + environment.socket;

  constructor() {
  }


  public connect(url): Subject<MessageEvent> {
    return this.create(this.webSocket + url);
  }

  private create(url): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
