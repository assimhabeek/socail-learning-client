import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WsService } from '../ws.service';
import { URLS } from '../urls';
import { TokenStorage } from '../auth/token.storage';
import { UsersService } from '../auth/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ChatRequestedComponent } from './chat-requested.component';
import { Router } from '@angular/router';
import { User } from '../domain/user';

export const eventTypes = {
  CHAT_REQUESTED: 0,
  CHAT_ACCEPTED: 1,
  CHAT_REJECTED: 2,
  CHAT_MESSAGE_RECEIVED: 3
}
export class ChatRequest {
  public id: number;
  public eventType: number;
  public senderId: number;
  public receiverId: number;
}


@Injectable()
export class ChatService {

  public messages: Subject<any>;
  public lastRequest;
  public acceptedRequest: ChatRequest;
  public otherPeerId: string = "";
  public otherPeer: User;

  constructor(private wsService: WsService,
    private _dialog: MatDialog,
    private usersService: UsersService,
    private tokenStorage: TokenStorage,
    private router: Router) {
    this.conncetToChat();
    this.listenToCallRequest();
  }



  conncetToChat() {
    const url = URLS.chat + '?Authorization=' + this.tokenStorage.getStoredToken();
    this.messages = this.wsService.connect(url)
  }


  public streamCallRequest(): Observable<any> {
    return this.messages.map((response: MessageEvent) => {
      return JSON.parse(response.data);
    });;
  }

  listenToCallRequest() {
    this.streamCallRequest().subscribe(res => {
      switch (res.eventType) {
        case eventTypes.CHAT_REQUESTED:
          this.chatRequested(res)
          break;
        case eventTypes.CHAT_ACCEPTED:
          this.chatAccetpted(res);
          break;
        case eventTypes.CHAT_REJECTED:
          this.chatRejected(res);
          break;
        case eventTypes.CHAT_MESSAGE_RECEIVED:
          this.chatMessageReceived(res);
          break;
      }
    });
  }



  chatRequested(request: ChatRequest) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.width = '300px';
    config.data = this.usersService.getUserById(request.senderId)
      .subscribe(user => {
        config.data = user;
        this._dialog.open(ChatRequestedComponent, config).afterClosed()
          .subscribe(res => {
            request.eventType = res ? eventTypes.CHAT_ACCEPTED : eventTypes.CHAT_REJECTED;
            this.send(request);
            if (res) {
              this.otherPeer = user;
              this.acceptedRequest = request;
              this.router.navigate(['/index/vedioCall']);
            }

          });
      });

  }

  chatAccetpted(request: ChatRequest) {
    this.acceptedRequest = request;
  }

  chatRejected(request: ChatRequest) {
    this.acceptedRequest = null;
    this.otherPeer = null;
    this.otherPeer = null;
  }

  chatMessageReceived(request: any) {
    this.otherPeerId = request.callerId;
  }

  send(data: any) {
    this.messages.next(data);
  }

  sendChatRequest(userId: number, id: number) {
    let chatRequest: ChatRequest = {
      id: 0,
      eventType: eventTypes.CHAT_REQUESTED,
      senderId: userId,
      receiverId: id
    };
    this.send(chatRequest);
  }

  public sendMessage(value, id) {
    this.send({
      id: this.acceptedRequest.id,
      senderId: this.acceptedRequest.senderId == id ? this.acceptedRequest.senderId : this.acceptedRequest.receiverId,
      receiverId: this.acceptedRequest.senderId == id ? this.acceptedRequest.receiverId : this.acceptedRequest.senderId,
      eventType: eventTypes.CHAT_MESSAGE_RECEIVED,
      callerId: value
    });
  }

  endCall() {
    this.acceptedRequest.eventType = eventTypes.CHAT_REJECTED;
    this.send(this.acceptedRequest);
    this.acceptedRequest = null;
    this.otherPeer = null;
    this.otherPeer = null;
  }


}
