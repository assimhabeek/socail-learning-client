import {Component, HostBinding, OnInit} from '@angular/core';
import {User} from '../../domain/user';
import {debounce, slideInLeftAnimation} from '../../../shared/animations';
import {UsersService} from '../users.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {TermsComponent} from './terms.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorage} from '../token.storage';
import {Specialty} from '../../domain/spcialty';
import {SpecialtiesService} from '../../specialty/specialties.service';

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
  public showPassword: boolean;
  public errorMessage: string;
  specailties: Specialty[] = [];

  constructor(private usersService: UsersService,
              private specialtiesService: SpecialtiesService,
              private _dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new User('', '');
  }

  submit(state: boolean) {
    if (state) {
      this.openDialog();
    }
  }

  registerUser() {
    this.usersService.register(this.user)
      .subscribe((token: string) => {
        this.usersService.storeToken(token, true);
        this.router.navigate(['/emailSend']);
      }, (error: HttpErrorResponse) => {
        this.errorMessage = error.status === 0 ? 'NO_CONNECTION' : error.message;
      });
  }

  openDialog() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    this._dialog.open(TermsComponent, config).afterClosed()
      .subscribe(res => {
        if (res) {
          this.registerUser();
        }
      });
  }

  yearChanged() {
    this.specialtiesService.getSpecialtiesByYear(this.user.year)
      .subscribe((spe: Specialty[]) => {
        this.specailties = spe;
      });
  }

}


@Component({
  selector: 'app-registration-token-validation',
  template: `
    <mat-card class="sl-message">
      <mat-card-header>
        <h1>{{'EMAIL_VALIDATION' | translate}}</h1>
      </mat-card-header>
      <mat-card-content>
        <div [ngSwitch]="valid">
          <p *ngSwitchCase="true">{{ 'CONGRATULATION' | translate}}</p>
          <p *ngSwitchCase="false">{{ 'FAILED' | translate}}</p>

        </div>

      </mat-card-content>
      <mat-card-actions>
        <div class="center">
          <a mat-button routerLink="/index">
            <mat-icon>arrow_back</mat-icon>
            {{'BACK_TO_INDEX' | translate}}</a>
        </div>
      </mat-card-actions>
    </mat-card>`,
  animations: [slideInLeftAnimation]

})
export class RegistrationTokenValidationComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  valid: boolean;

  constructor(private usersService: UsersService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    const token = this.router.snapshot.params ? this.router.snapshot.params['token'] : '';
    if (token) {
      this.usersService.validateRegistrationToken(token)
        .subscribe((token) => {
          this.valid = true;
          this.usersService.storeToken(token, true);
        }, (error: HttpErrorResponse) => {
          this.valid = false;
        });
    }
  }

}


@Component({
  selector: 'app-email-send',
  template: `
    <mat-card class="sl-message">
      <mat-card-header>
        <h1>{{'ONE_MORE_STEP' | translate}}</h1>
      </mat-card-header>
      <mat-card-content>
        <p>{{'MESSAGE_SENT' | translate}}</p>
      </mat-card-content>
      <mat-card-actions>
        <div class="center">
          <button mat-raised-button color="primary" (click)="resendEmail()">{{'RESEND' | translate}}</button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  animations: [slideInLeftAnimation]

})
export class EmailSendComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor(private usersService: UsersService) {
  }

  resendEmail() {
    this.usersService.sendRegistrationEmailAgain()
      .subscribe();
  }
}

