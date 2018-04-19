import { Injectable, EventEmitter } from '@angular/core';
import { User } from './domain/user';
export class Notification {
  message: string;
  icon: string;
  user: User;
  isRead: boolean;
  constructor(message: string, icon: string, user: User, isRead: boolean) {
    this.message = message;
    this.icon = icon;
    this.user = user;
    this.isRead = isRead;
  }
}

@Injectable()
export class NotificationService {

  public notificationArrived: EventEmitter<Notification> = new EventEmitter<Notification>();
  constructor() { }

  sendNotification(notification: Notification) {
    this.notificationArrived.emit(notification);
  }

}
