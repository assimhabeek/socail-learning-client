import { Component, Inject, OnInit, HostBinding, Input, OnDestroy } from '@angular/core';
import { UsersService } from '../auth/users.service';
import { fadeAnimation } from '../../shared/animations';
import { User } from '../domain/user';
import { ChatService } from './chat.service';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  animations: [fadeAnimation]
})

export class ConversationComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public conversations: any[];

  constructor(private usersService: UsersService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.chatService.getRooms()
      .subscribe(res => {
        this.conversations = res;
      });
  }
}




