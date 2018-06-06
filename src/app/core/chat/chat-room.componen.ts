import { Component, OnInit, HostBinding } from '@angular/core';
import { UsersService } from '../auth/users.service';
import { fadeAnimation, routerAnimation, fadeChat } from '../../shared/animations';
import { User } from '../domain/user';
import { ChatService } from './chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../domain/room';
import { Chat } from '../domain/chat';
import * as moment from 'moment';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { startWith } from 'rxjs/operators/startWith';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  animations: [fadeAnimation, fadeChat]
})

export class ChatRoomComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public currentUser: User;
  public roomId: number;
  public message: Chat = new Chat(0, 0, '', '', 0);
  public messages: Chat[] = [];
  public roomUsers: User[] = [];

  userCtrl: FormControl;
  filteredUsers: Observable<any[]>;

  constructor(public chatService: ChatService,
    public usersService: UsersService,
    public route: ActivatedRoute,
    public router: Router) { }


  ngOnInit() {
    this.loadCurrentUser();
    this.chatService.chatMessagesArrived.subscribe(res => {
      if (res.roomId == this.roomId) {
        this.messages.push(res);
      }
    });
    this.userCtrl = new FormControl();
    this.userCtrl.valueChanges
      .debounceTime(800)
      .pipe(startWith(''))
      .subscribe(user => {
        this.filteredUsers = this.filterUsers(user);
      });
  }

  displayFn(user) {
    return user ? user.lastName + ' ' + user.firstName : null;
  }

  filterUsers(user): Observable<any[]> {
    return this.usersService.getUsersByFilterAndPage(0, user).map(item => item[1]);
  }


  loadCurrentUser() {
    this.usersService.user.subscribe(user => {
      this.currentUser = user;
      this.readRouteParams();
    });
  }

  readRouteParams() {
    this.route.queryParams.subscribe(res => {
      if (res && res['firstPerson']) {
        this.createRoom(this.currentUser.id, +res['firstPerson']);
      } else if (res && +res['room']) {
        this.chatService.isRegistred(+res['room'])
          .subscribe(re => {
            if (re) {
              this.roomId = +res['room'];
              this.init();
            } else {
              this.router.navigate(['/index/chat']);
            }
          })
      }
    });
  }


  createRoom(userId: number, id: number) {
    this.chatService.createRoom(new Room(0, userId, id))
      .subscribe(res => {
        this.roomId = +res;
        this.init();
      });
  }


  init() {
    this.getMessages(this.roomId);
    this.message.roomId = +this.roomId;
    this.message.sender = this.currentUser.id;
    this.loadRoomUsers(this.roomId);
  }

  loadRoomUsers(room: number) {
    this.roomUsers.push(this.currentUser);
    this.chatService.getRoomUsers(room)
      .subscribe(res => {
        this.roomUsers = this.roomUsers.concat(res);
      });
  }

  getUser(id) {
    return this.roomUsers.find(item => item.id === id);
  }

  getMessages(roomId: number) {
    this.chatService.getMessages(roomId)
      .subscribe(res => {
        this.messages = res;
      });
  }


  addMember(room: number, user: number) {
    this.chatService.addUserToRomm(room, user)
      .subscribe(res => {
        this.roomUsers.push(this.userCtrl.value);
      });
  }



  sendMessage(message: Chat) {
    this.chatService.sendChatMessage(message)
      .subscribe();
  }

  submit(form: FormGroupDirective) {
    if (form.valid) {
      moment.locale('en');
      this.message.messageDate = moment().format('YYYY-MM-DD HH:mm:ss');
      this.sendMessage(this.message)
      form.reset();
      form.resetForm();
    }
  }

  submitAddFrom(state) {
    if (state) {
      this.addMember(this.roomId, this.userCtrl.value.id);
    }
  }

}









