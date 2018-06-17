import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { ChatService } from '../chat/chat.service';
import { Chat } from '../domain/chat';
import { UsersService } from '../auth/users.service';

class Message {
  chatMessage: Chat;
  user: User;
  isRead: boolean;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})


export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  public currentUser: User;
  constructor(private chatService: ChatService,
    private userService: UsersService) { }

  ngOnInit() {
    this.userService.user.subscribe(res => {
      this.currentUser = res;
      this.laodMessages();
      this.listenToMessages();
    })
  }


  listenToMessages() {
    this.chatService.chatMessagesArrived
      .subscribe((message: Chat) => {
        if (message.sender != this.currentUser.id) {
          if (this.messages.filter(ite => ite.chatMessage.sender === message.sender).length > 0) {
            let mes = this.messages.filter(ite => ite.chatMessage.sender === message.sender)[0];
            mes.chatMessage = message;
            mes.isRead = false;
          } else {
            this.userService.getUserById(message.sender)
              .subscribe(res => {
                this.messages.unshift({ chatMessage: message, user: res, isRead: false });
              });
          }
        }
      });
  }


  toggleAll(value) {
    this.messages.forEach(i => i.isRead = value.checked);
  }

  laodMessages() {
    this.chatService.getUnReadMessages().subscribe((res: Chat[]) => {
      res.forEach((message: Chat) => {
        if (message.sender != this.currentUser.id) {
          if (this.messages.filter(ite => ite.chatMessage.sender === message.sender).length > 0) {
            let mes = this.messages.filter(ite => ite.chatMessage.sender === message.sender)[0];
            mes.chatMessage = message;
            mes.isRead = false;
          } else {
            this.userService.getUserById(message.sender)
              .subscribe(res => {
                this.messages.unshift({ chatMessage: message, user: res, isRead: false });
              });
          }
        }
      });
    });
  }


  unReadMessageCount(): number {
    return this.messages.filter(x => !x.isRead).length;
  }

}
