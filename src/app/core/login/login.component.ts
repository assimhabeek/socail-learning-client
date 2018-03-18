import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {User} from '../domain/user';
import {debounce, slideInLeftAnimation} from '../../shared/animations';
import {UsersService} from '../users.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenStorage} from '../token.storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideInLeftAnimation, debounce]
})
export class LoginComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';


  public user: User;
  public showPassword: boolean;
  public errorMessage: string;

  constructor(private usersService: UsersService,
              private tokenService: TokenStorage,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new User('', '');
    this.showPassword = false;
  }

  submit(state) {
    if (state) {
      this.usersService.login(this.user)
        .subscribe((token: string) => {
          this.tokenService.storeToken(token);
          this.router.navigate(['/index']);
        }, (error: HttpErrorResponse) => {
          this.errorMessage = error.status === 0 ? 'NO_CONNECTION' : error.error;
        });
    }
  }


}
