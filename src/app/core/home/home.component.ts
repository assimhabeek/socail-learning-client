import {Component, OnInit} from '@angular/core';
import {PublicationService} from '../publication/publication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  publications: any[] = [];

  page = 0;

  constructor(public publicationsService: PublicationService) {
  }

  ngOnInit() {
    this.loadPublications();
  }

  loadPublications() {
    this.publicationsService.getPublications(this.page)
      .subscribe(res => {
        this.publications = this.publications.concat(res);
        this.publicationsService.getStreamedPublications()
          .subscribe(r => {
            const test = JSON.parse(r.data);
            test.user = {};
            this.publications.unshift(test);
          });
      });
  }


  loadMore() {
    this.page += 1;
    this.loadPublications();
  }
}
