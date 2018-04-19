import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '../notification.service';
import { User } from '../domain/user';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

  notifications: Notification[] = [new Notification('test', 'book', new User('sdaf', 'fsad'), false)];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadNotification();
    this.listenToNotifications();
  }


  loadNotification() {
    this.notificationService.notificationArrived
      .subscribe(res => {
        this.notifications.push(res);
      })
  }

  listenToNotifications() {
    this.notificationService.notificationArrived
      .subscribe(notification => {
        this.notifications.unshift(notification);
      });
  }

  unReadNotificationCount(): number {
    return this.notifications.filter(x => !x.isRead).length;
  }

}
