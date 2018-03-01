import {Component, HostBinding, OnInit} from '@angular/core';
import {User} from '../domain/user';
import {slideInLeftAnimation} from '../../shared/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideInLeftAnimation]
})
export class LoginComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  public user: User;
  public showPassword: boolean;

  ngOnInit() {
    this.user = new User('', '');
    this.showPassword = false;
  }

  submit(state: boolean) {
    if (state) {
      console.log(this.user.password + this.user.username);
    }
  }

}
