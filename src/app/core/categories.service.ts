import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLS } from './urls';
import { HttpService } from './http.service';
import { Category } from './domain/category';

@Injectable()
export class CategoriesService {

  constructor(private httpService: HttpService) {
  }


  getCategories(): Observable<Category[]> {
    return this.httpService.get(URLS.categories).share();
  }


  add(data: Category) {
    return this.httpService.postWithAuth(URLS.categories, data, { responseType: 'text' });
  }

  edit(data: Category) {
    return this.httpService.putWithAuth(URLS.categories, data, { responseType: 'text' });
  }

  delete(id: number) {
    return this.httpService.deleteWithAuth(URLS.categories, { responseType: 'text', params: { id: id } });
  }

}
