import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLS } from './urls';
import { HttpService } from './http.service';
import { Module } from './domain/module';

@Injectable()
export class ModulesService {

  constructor(private httpService: HttpService) {
  }


  getModules(): Observable<Module[]> {
    return this.httpService.get(URLS.modules);
  }

  getModulesBySpecialty(spId: number): Observable<Module[]> {
    return this.httpService.get(URLS.modules, { params: { specialtyId: spId } });
  }

}
