import { Component, HostBinding, OnInit } from '@angular/core';
import { User } from '../../domain/user';
import { debounce, slideInLeftAnimation } from '../../../shared/animations';
import { UsersService } from '../users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TermsComponent } from './terms.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialty } from '../../domain/spcialty';
import { SpecialtiesService } from '../../specialties.service';

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

  user: any;
  public showPassword: boolean;
  public errorMessage: string;
  specailties: Specialty[] = [];

  constructor(private usersService: UsersService,
    private specialtiesService: SpecialtiesService,
    private _dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.user = {};
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
  templateUrl: './registration-token-validation.component.html',
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
  templateUrl: './email-send.component.html',
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

