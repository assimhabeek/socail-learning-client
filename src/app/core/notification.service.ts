import { Injectable, EventEmitter } from '@angular/core';
import { User } from './domain/user';

export class Notification {
  id: number;
  message: string;
  publicationId: number;
  user: User;
  isRead: boolean;

  constructor(message: string, publicationId: number, user: User, isRead: boolean) {
    this.message = message;
    this.publicationId = publicationId;
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
