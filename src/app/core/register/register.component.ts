import {Component, HostBinding, OnInit} from '@angular/core';
import {User} from '../domain/user';
import {debounce, slideInLeftAnimation} from '../../shared/animations';
import {UsersService} from '../users.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [slideInLeftAnimation, debounce]
})
export class RegisterComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  user: User;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.user = new User('', '');
  }

  submit(state: boolean) {
    if (state) {
      this.usersService.register(this.user)
        .subscribe(res => {
          console.log(res);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
    }
  }


}
