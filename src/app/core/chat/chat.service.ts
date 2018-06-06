import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WsService } from '../ws.service';
import { URLS } from '../urls';
import { TokenStorage } from '../auth/token.storage';
import { UsersService } from '../auth/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ChatRequestedComponent } from './chat-requested.component';
import { Router } from '@angular/router';
import { User } from '../domain/user';
import { Room } from '../domain/room';
import { HttpService } from '../http.service';
import { Chat } from '../domain/chat';

export const eventTypes = {
  CHAT_REQUESTED: 0,
  CALL_ACCEPTED: 1,
  CALL_REJECTED: 2,
  CALLER_ID: 3,
  CHAT_MESSAGE: 4
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
  public chatMessagesArrived: EventEmitter<any> = new EventEmitter();
  constructor(private wsService: WsService,
    private _http: HttpService,
    private _dialog: MatDialog,
    private usersService: UsersService,
    private tokenStorage: TokenStorage,
    private router: Router) {
  }



  conncetToChat() {
    if (this.tokenStorage.getStoredToken() != null) {
      const url = URLS.chat + '?Authorization=' + this.tokenStorage.getStoredToken();
      this.messages = this.wsService.connect(url);
      this.listenToCallRequest();
    }
  }


  public streamCallRequest(): Observable<any> {
    return this.messages.map((response: MessageEvent) => {
      console.log(response);
      return JSON.parse(response.data);
    });;
  }

  listenToCallRequest() {
    this.streamCallRequest().subscribe(res => {
      switch (res.eventType) {
        case eventTypes.CHAT_REQUESTED:
          this.chatRequested(res)
          break;
        case eventTypes.CALL_ACCEPTED:
          this.chatAccetpted(res);
          break;
        case eventTypes.CALL_REJECTED:
          this.chatRejected(res);
          break;
        case eventTypes.CALLER_ID:
          this.callerIdReceived(res);
          break;
        default:
          this.chatMessageRecevied(res);
          break;
      }
    });
  }


  chatMessageRecevied(res) {
    this.chatMessagesArrived.emit(res);
  }

  isRegistred(roomId: number) {
    return this._http.getWithAuth(URLS.isRegistred, {
      params: {
        roomId: roomId
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
            request.eventType = res ? eventTypes.CALL_ACCEPTED : eventTypes.CALL_REJECTED;
            this.send(request);
            if (res) {
              this.otherPeer = user;
              this.acceptedRequest = request;
              this.router.navigate(['/index/vedioCall'], { queryParams: { id: this.otherPeer.id } });
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

  callerIdReceived(request: any) {
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
      eventType: eventTypes.CALLER_ID,
      callerId: value
    });
  }

  endCall() {
    this.acceptedRequest.eventType = eventTypes.CALL_REJECTED;
    this.send(this.acceptedRequest);
    this.acceptedRequest = null;
    this.otherPeer = null;
    this.otherPeer = null;
  }

  createRoom(room: Room) {
    return this._http.postWithAuth(URLS.room, room, { responseType: 'text' });
  }

  getRooms() {
    return this._http.getWithAuth(URLS.room);
  }

  getRoomUsers(room: number) {
    return this._http.getWithAuth(URLS.roomUsers, { params: { roomId: room } });
  }

  getMessages(roomId: number) {
    return this._http.getWithAuth(URLS.messages, { params: { roomId: roomId } });
  }

  sendChatMessage(message: Chat) {
    return this._http.postWithAuth(URLS.messages, message, { responseType: 'text' });
  }

  addUserToRomm(roomId: number, userId: number) {
    return this._http.postWithAuth(URLS.roomUsers, {}, { params: { room: roomId, user: userId } });
  }


}
