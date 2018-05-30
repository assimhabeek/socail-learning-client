import { Component, OnInit, HostBinding } from '@angular/core';
import { Publication } from '../domain/publication';
import { User } from '../domain/user';
import { PublicationService } from '../publication/publication.service';
import { UsersService } from '../auth/users.service';
import { fadeAnimation } from '../../shared/animations';

@Component({
  selector: 'app-val',
  templateUrl: './val.component.html',
  styleUrls: ['./val.component.scss'],
  animations: [fadeAnimation]
})
export class ValComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public publications: any[];
  public users: any[];

  constructor(public publicationsService: PublicationService,
    public usersService: UsersService) { }

  ngOnInit() {
    this.loadPublications();
    this.loadUsers();
  }


  loadUsers() {
    this.publicationsService.getReportedPublications()
      .subscribe(res => {
        this.publications = res;
      });
  }

  loadPublications() {
    this.usersService.getReportedUsers()
      .subscribe(res => {
        this.users = res;
      });
  }

  deleteUser(id: number) {
    this.usersService.deleteAccount(id)
      .subscribe(res => {
        this.loadPublications();
        this.loadUsers();
      });
  }

  deletePublication(id: number) {
    this.publicationsService.deletePublication(id)
      .subscribe(res => {
        this.loadPublications();
        this.loadUsers();
      });
  }
}
