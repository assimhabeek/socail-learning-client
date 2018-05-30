import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Opinion } from './domain/opinion';
import { URLS } from './urls';

@Injectable()
export class OpinionService {


  constructor(private http: HttpService) { }


  public getOpinion(userId: number, publicationId: number) {
    return this.http.getWithAuth(URLS.opinion, {
      params: {
        publicationId: publicationId
      }
    })
  }
  public postOpinion(op: Opinion) {
    return this.http.postWithAuth(URLS.opinion, op);
  }
}
