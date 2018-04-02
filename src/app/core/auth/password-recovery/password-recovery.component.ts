import {Component, HostBinding, OnInit} from '@angular/core';
import {User} from '../../domain/user';
import {UsersService} from '../users.service';
import {HttpErrorResponse} from '@angular/common/http';
import {debounce, slideInLeftAnimation} from '../../../shared/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  animations: [slideInLeftAnimation, debounce]

})
export class PasswordRecoveryComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  user: User;
  error = false;


  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new User('', '');
  }

  submit(state: boolean) {
    if (state) {
      this.usersService.sendPasswordToEmail(this.user.email)
        .subscribe((response) => {
          this.router.navigate(['passwordSent']);
        }, (error: HttpErrorResponse) => {
          this.error = true;
        });
    }
  }
}


@Component({
  selector: 'app-password-sent',
  template: `
    <mat-card class="sl-message">
      <mat-card-header>
        <h1>{{'PASSWORD_SENT' | translate}}</h1>
      </mat-card-header>
      <mat-card-content>
        <p>{{'PASSWORD_SENT_MESSAGE' | translate}}</p>
      </mat-card-content>
      <mat-card-actions>
        <div class="center">
          <a mat-button routerLink="/index">
            <mat-icon>arrow_back</mat-icon>
            {{'BACK_TO_INDEX' | translate}}</a>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  animations: [slideInLeftAnimation]

})
export class PasswordSentComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';


}
