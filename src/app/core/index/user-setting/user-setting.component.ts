import { Component, Input } from '@angular/core';
import { User } from '../../domain/user';
import { Router } from '@angular/router';
import { UsersService } from '../../auth/users.service';

@Component({
  selector: 'app-user-setting-menu',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})

export class UserSettingMenuComponent {

  @Input() user: User;

  constructor(private userService: UsersService,
    private router: Router) {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

}
