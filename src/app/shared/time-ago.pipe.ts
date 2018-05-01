import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/ar';


import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(value: any, args?: any): any {
    moment.locale(this.translate.currentLang);
    return moment(value).fromNow();
  }

}
