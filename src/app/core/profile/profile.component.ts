import { Component, OnInit, HostBinding } from '@angular/core';
import { UsersService } from '../auth/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialtiesService } from '../specialties.service';
import { User } from '../domain/User';
import { fadeAnimation } from '../../shared/animations';
import { Specialty } from '../domain/spcialty';
import { PublicationService } from '../publication/publication.service';
import { Publication } from '../domain/publication';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [fadeAnimation]
})
export class ProfileComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  public user: User;
  public specialties: any[] = [];
  public publications: Publication[];

  constructor(public usersService: UsersService,
    public specialtiesService: SpecialtiesService,
    public route: ActivatedRoute,
    public publicationsService: PublicationService,
    public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (+id !== 0) {
        this.loadUser(id);
      } else {
        this.router.navigate['/index'];
      }
      this.loadSpecialties();
    });

  }

  loadUser(id: number) {
    this.usersService.getUserById(id).subscribe(res => {
      this.user = res;
      this.loadPublications();
    });
  }

  getSpec(): Specialty {
    return this.specialties.find(item => item.id == this.user.specialtyId)
  }

  loadSpecialties() {
    this.specialtiesService.getSpecialties()
      .subscribe(res => {
        this.specialties = res;
      });
  }

  loadPublications() {
    this.publicationsService.getPublicationsByUser(this.user.id)
      .subscribe(res => {
        this.publications = res;
      });
  }
}
