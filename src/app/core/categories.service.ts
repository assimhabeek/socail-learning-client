import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLS} from './urls';
import {HttpService} from './http.service';
import {Category} from './domain/category';

@Injectable()
export class CategoriesService {

  constructor(private httpService: HttpService) {
  }


  getCategories(): Observable<Category[]> {
    return this.httpService.get(URLS.categories).share();
  }
}
