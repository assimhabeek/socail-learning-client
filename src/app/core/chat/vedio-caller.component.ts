import { Component, OnInit, HostBinding, } from '@angular/core';
import { UsersService } from '../auth/users.service';
import { fadeAnimation } from '../../shared/animations';
import { User } from '../domain/user';
import { ChatService } from './chat.service';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-vedio-caller',
  templateUrl: './vedio-caller.component.html',
  animations: [fadeAnimation]
})

export class VedioCallerComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public currentUser: User;

  constructor(public chatService: ChatService,
    public usersService: UsersService,
    public route: ActivatedRoute) { }


  ngOnInit() {
    this.loadCurrentUser();
  }



  loadCurrentUser() {
    this.usersService.user.subscribe(user => {
      this.currentUser = user;
      this.call();
    });
  }

  public call() {
    this.route.queryParams.subscribe(res => {
      if (res && res['id']) {
        this.chatService.sendChatRequest(this.currentUser.id, +res['id']);
      }
    });
  }

  public sendMessage($eve) {
    this.chatService.sendMessage($eve, this.currentUser.id);
  }

  public endCall() {
    this.chatService.endCall();
  }


}








