import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UserSettingMenuComponent } from './index/index.component';
import { Opinion } from './domain/opinion';
import { URLS } from './urls';

@Injectable()
export class OpinionService {


  constructor(private http: HttpService) { }


  public postOpinion(op: Opinion) {
    return this.http.postWithAuth(URLS.opinion, op, {
      responseType: 'text'
    });
  }
}
