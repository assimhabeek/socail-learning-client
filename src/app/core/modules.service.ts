import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLS} from './urls';
import {Specialty} from './domain/spcialty';
import {HttpService} from './http.service';

@Injectable()
export class ModulesService {

  constructor(private httpService: HttpService) {
  }


  getModules(): Observable<Specialty[]> {
    return this.httpService.get(URLS.modules);
  }
}
