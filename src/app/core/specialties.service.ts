import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLS } from './urls';
import { Specialty } from './domain/spcialty';
import { HttpService } from './http.service';

@Injectable()
export class SpecialtiesService {

  constructor(private httpService: HttpService) {
  }

  getSpecialtiesByYear(year: number): Observable<Specialty[]> {
    return this.httpService.get(URLS.specialties, { params: { year: year } });
  }

  getSpecialties(): Observable<Specialty[]> {
    return this.httpService.get(URLS.specialties).share();
  }
}
