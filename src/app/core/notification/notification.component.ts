import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '../notification.service';
import { User } from '../domain/user';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.listenToNotifications();
  }


  listenToNotifications() {
    this.notificationService.notificationArrived
      .subscribe(notification => {
        this.notifications.unshift(notification);
      });
  }


  toggleAll(value) {
    this.notifications.forEach(i => i.isRead = value.checked);
  }


  unReadNotificationCount(): number {
    return this.notifications.filter(x => !x.isRead).length;
  }

}
