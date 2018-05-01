import { Component, Inject, OnInit, HostBinding, Input } from '@angular/core';
import { UsersService } from '../auth/users.service';
import { fadeAnimation } from '../../shared/animations';
import { User } from '../domain/user';
import { ChatService } from './chat.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Chat } from '../domain/chat';
import * as moment from 'moment';

const eventTypes = {
  CHAT_REQUESTED: 0,
  CHAT_ACCEPTED: 1,
  CHAT_REJECTED: 2,
  CHAT_MESSAGE_RECEIVED: 3
}

export class ChatRequest {
  public eventType: number;
  public senderId: number;
  public receiverId: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [fadeAnimation]
})

export class ChatComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  selectedUser: User;
  currentUser: User;
  users: User[];
  public messages: Chat[] = [];
  public newMessage: Chat;
  constructor(
    private usersService: UsersService,
    private _dialog: MatDialog,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.loadCurrentUser();
    this.listenToChat();
  }

  loadCurrentUser() {
    this.usersService.user.subscribe(res => {
      this.currentUser = res;
      this.newMessage = new Chat(0, this.currentUser.id, 0, '', null);
    });
  }

  loadUsers() {
    this.usersService.getUsers()
      .subscribe(res => {
        this.users = res;
      });
  }

  sendChatRequest(id: number) {
    let chatRequest: ChatRequest = {
      eventType: eventTypes.CHAT_REQUESTED,
      senderId: this.currentUser.id,
      receiverId: id
    };
    this.chatService.send(chatRequest);
  }

  public sendMessage(state) {
    if (state) {
      moment.locale('en');
      this.newMessage.messageDate = moment().format('YYYY-MM-DD HH:mm:ss');
      this.newMessage.receiverId = this.selectedUser.id;
      this.chatService.send({ eventType: eventTypes.CHAT_MESSAGE_RECEIVED, message: this.newMessage });
    }
  }

  chatRequested(request: ChatRequest) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.width = '300px';
    config.data = this.users.find(x => x.id == request.senderId);
    this._dialog.open(ChatRequestedComponent, config).afterClosed()
      .subscribe(res => {
        request.eventType = res ? eventTypes.CHAT_ACCEPTED : eventTypes.CHAT_REJECTED
        if (res) {
          this.selectedUser = this.users.find(x => x.id == request.senderId);
        }
        this.chatService.send(request);
      });

  }
  chatAccetpted(request: ChatRequest) {
    this.selectedUser = this.users.find(x => x.id == request.receiverId);
  }

  chatRejected(request: ChatRequest) {
    console.log('no');
  }

  chatMessageReceived(request: any) {
    console.log(request);
    this.messages.push(request.message);
  }


  listenToChat() {
    this.chatService.streamChat().subscribe(res => {
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

}



@Component({
  selector: 'app-chat-requested',
  template: `
    <h1 mat-dialog-title>{{ 'CHAT_REQUESTED' | translate }}</h1>
    <mat-dialog-content>
      <img  class="avatar mat-elevation-z6" [src]="data.profileImage"/>  
      <h3 mat-line><b>{{ data.lastName + ' ' + data.firstName | uppercase}}</b></h3>
      <p mat-line>{{ data.about }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <div>
        <button mat-button (click)="disAgree()">{{ 'REJECT' | translate}}</button>
        <button mat-raised-button (click)="agree()" color="primary">{{ 'ACCEPT' | translate}}
        </button>
      </div>
    </mat-dialog-actions>`,
  styles: [`
    .avatar{
      border-radius:50%
    } 

    mat-dialog-content {
      text-align:center;
      padding: 20px;
    }
  `]
})
export class ChatRequestedComponent {
  allalisgood
  user: User;
  constructor(private _dialogRef: MatDialogRef<ChatRequestedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  disAgree() {
    this._dialogRef.close(false);
  }

  agree() {
    this._dialogRef.close(true);
  }


}
