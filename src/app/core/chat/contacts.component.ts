import { Component, Inject, OnInit, HostBinding, Input, OnDestroy } from '@angular/core';
import { UsersService } from '../auth/users.service';
import { fadeAnimation } from '../../shared/animations';
import { User } from '../domain/user';
import { ChatService } from './chat.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Chat } from '../domain/chat';
import { Friend } from '../domain/friend';
import * as moment from 'moment';
import { FriendService } from '../friend.service';

const friendTypes = {
  WAITING: 1,
  ACCEPTED: 3,
  REJECTED: 4,
}


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [fadeAnimation]
})

export class ContactsComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';


  currentUser: User;
  users: User[];
  friends: Friend[];

  constructor(private usersService: UsersService,
    private friendService: FriendService) { }

  ngOnInit() {
    this.loadCurrentUser();
    this.loadFriends();
  }

  loadCurrentUser() {
    this.usersService.user.subscribe(res => {
      this.currentUser = res;
      this.loadPeople();
    });
  }

  loadPeople() {
    this.usersService.getUsers()
      .subscribe(res => {
        this.users = res.filter(item => item.id != this.currentUser.id);
      });
  }

  loadFriends() {
    this.friendService.loadFriends()
      .subscribe(res => {
        this.friends = res;
      });
  }


  isFriend(id: number) {
    return this.friends ? this.friends.filter(f => (id == f.senderId || id == f.receiverId) && f.state == friendTypes.ACCEPTED).length > 0 : false;
  }

  isRequestSent(id: number) {
    return this.friends ? this.friends.filter(f => id == f.receiverId && f.state == friendTypes.WAITING).length > 0 : false;
  }

  isRequestReceived(id: number) {
    return this.friends ? this.friends.filter(f => id == f.senderId && f.state == friendTypes.WAITING).length > 0 : false;
  }


  isBlocked(id: number) {
    return this.friends ? this.friends.filter(f => (id == f.senderId || id == f.receiverId) && f.state == friendTypes.REJECTED).length > 0 : false;
  }




  getPeople() {
    return this.users ? this.users : [];
  }

  sendRequest(id: number) {
    const req = new Friend(0, this.currentUser.id, id, friendTypes.WAITING);
    this.friendService.sendRequest(req)
      .subscribe(res => {
        this.loadFriends();
      })
  }

  accept(id: number) {
    const req = this.friends.filter(item => item.senderId == id)[0];
    req.state = friendTypes.ACCEPTED;
    this.friendService.sendAnswer(req)
      .subscribe(res => {
        this.loadFriends();
      });
  }

  block(id: number) {
    const req = this.friends.filter(item => (item.senderId == id || item.receiverId == id))[0];
    req.state = friendTypes.REJECTED;
    this.friendService.sendAnswer(req)
      .subscribe(res => {
        this.loadFriends();
      });
  }

  cancel(id: number) {
    const req = this.friends.filter(item => item.receiverId == id || item.senderId == id)[0];
    this.friendService.deleteRequest(req.id)
      .subscribe(res => {
        this.loadFriends();
      })
  }

}




