import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeAnimation} from '../../shared/animations';
import {UsersService} from '../auth/users.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {SpecialtiesService} from '../specialties.service';
import {Specialty} from '../domain/spcialty';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeAnimation]
})
export class AccountComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  user: any = {};
  password: any = {};
  specailties: Specialty[] = [];
  src = './assets/img/sl-logo.png';
  public oldShowPassword: boolean;
  public newShowPassword: boolean;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private usersService: UsersService,
              private specialtiesService: SpecialtiesService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.usersService.user.subscribe(user => {
      this.user = user;
      this.yearChanged();
    });
  }

  updateInfo(state: boolean) {
    if (state) {
      this.usersService.updateUserInfo(this.user)
        .subscribe();
    }
  }

  changePassword(state: boolean) {
    if (state) {
      this.usersService.updatePassword(this.password)
        .subscribe();
    }
  }


  yearChanged() {
    this.specialtiesService.getSpecialtiesByYear(this.user.year)
      .subscribe((spe: Specialty[]) => {
        this.specailties = spe;
      });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.user.profileImage = image;
  }

  imageLoaded() {
  }

  loadImageFailed() {
  }
}
