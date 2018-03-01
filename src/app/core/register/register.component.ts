import {Component, HostBinding, OnInit} from '@angular/core';
import {User} from '../domain/user';
import {slideInLeftAnimation} from '../../shared/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [slideInLeftAnimation]
})
export class RegisterComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  user: User;

  ngOnInit() {
    this.user = new User('', '');
  }

  submit(state: boolean) {
    if (state) {
      console.log(this.user.password + this.user.username);
    }
  }


}
