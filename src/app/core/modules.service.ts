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

  add(data: Module) {
    return this.httpService.postWithAuth(URLS.modules, data, { responseType: 'text' });
  }

  edit(data: Module) {
    return this.httpService.putWithAuth(URLS.modules, data, { responseType: 'text' });
  }

  delete(id: number) {
    return this.httpService.deleteWithAuth(URLS.modules, { responseType: 'text', params: { id: id } });
  }

}
