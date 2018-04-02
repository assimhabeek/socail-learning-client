import {Directive, forwardRef, Input} from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import {UsersService} from '../users.service';

@Directive({
  selector: '[notEqual][formControlName],[notEqual][formControl],[notEqual][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => NotEqualValidator),
      multi: true
    }
  ]
})
export class NotEqualValidator implements AsyncValidator {

  @Input('notEqual') notEqual: string;

  constructor(private usersService: UsersService) {
  }

  validate(c: AbstractControl): any {
    const debounceTime = 500;
    return Observable
      .timer(debounceTime)
      .switchMap(() => {
        const observ = this.notEqual === 'username' ?
          this.usersService.findUsedUsername(c.value) :
          this.usersService.findUsedEmail(c.value);
        return observ.map(res => {
            return +res === 0 ? null : {notEqual: true};
          },
          err => {
            return null;
          });
      });
  }


}

