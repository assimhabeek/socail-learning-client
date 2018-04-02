import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {User} from '../domain/user';
import {UsersService} from './users.service';

@Injectable()
export class IsConnected implements CanActivate {
  constructor(public usersService: UsersService,
              public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.usersService.user
      .catch((error) => {
        this.router.navigate(['noConnection']);
        return of(false);
      }).map((user) => true);
  }
}


@Injectable()
export class IsLoggedIn implements CanActivate {
  constructor(public usersService: UsersService,
              public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.usersService.user
      .catch((error) => {
        this.router.navigate(['noConnection']);
        return of(false);
      }).map((user) => {
        if (user == null) {
          this.router.navigate(['login']);
        }
        return user != null;
      });
  }
}

@Injectable()
export class IsNotVerified implements CanActivate {
  constructor(public usersService: UsersService,
              public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.usersService.user
      .catch((error) => {
        this.router.navigate(['noConnection']);
        return of(false);
      }).map((user: User) => {
        if (user == null || user.verified) {
          this.router.navigate(['index']);
        }
        return user != null && !user.verified;
      });
  }
}


@Injectable()
export class NotForLoggedUsers implements CanActivate {
  constructor(public usersService: UsersService,
              public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.usersService.user
      .catch((error) => {
        this.router.navigate(['noConnection']);
        return of(false);
      }).map((user) => {
        if (user != null) {
          this.router.navigate(['index']);
        }
        return user == null;
      });
  }
}
