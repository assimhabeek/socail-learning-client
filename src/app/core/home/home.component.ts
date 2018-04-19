import { Component, HostBinding, OnInit } from '@angular/core';
import { PublicationService } from '../publication/publication.service';
import { SpecialtiesService } from '../specialties.service';
import { ModulesService } from '../modules.service';
import { CategoriesService } from '../categories.service';
import { UsersService } from '../auth/users.service';
import { User } from '../domain/user';
import { fadeAnimation } from '../../shared/animations';
import { NotificationService, Notification } from '../notification.service';
import { Publication } from '../domain/publication';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  filter: any = {};
  publicationSize = 1;
  publications: any[] = [];
  categories: any[] = [];
  specialties: any[] = [];
  modules: any[] = [];
  publicationEnd = false;
  currentUser: User;

  constructor(public publicationsService: PublicationService,
    public specialtiesService: SpecialtiesService,
    public modulesService: ModulesService,
    public categoriesService: CategoriesService,
    public notificationService: NotificationService,
    public usersService: UsersService) {
  }

  ngOnInit() {
    this.filter.page = 0;
    this.loadPublications();
    this.loadSpecialties();
    this.loadModules();
    this.loadCategories();
    this.loadUser();
  }

  filterPublications() {
    this.loadPublications();
  }

  loadPublications() {
    this.publicationsService.getPublications(this.filter)
      .subscribe(res => {
        this.publicationEnd = res.length === 0;
        this.publications = this.publications.concat(res);
        this.publicationsService.getStreamedPublications()
          .subscribe(r => {
            if (isNaN(r.data)) {
              const pub: Publication = JSON.parse(r.data);
              this.notificationService.sendNotification(new Notification(pub.title, 'book', pub.user, false))
              this.publications = this.publications.filter(ite => ite.id !== pub.id);
              this.publications.unshift(pub);
            } else {
              this.publications = this.publications.filter(item => item.id !== +r.data);
            }
          });
      });
  }


  loadMore() {
    this.filter.page += 1;
    this.loadPublications();
  }

  loadUser() {
    this.usersService.user.subscribe(res => {
      this.currentUser = res;
    });
  }

  loadSpecialties() {
    this.specialtiesService.getSpecialties()
      .subscribe(res => {
        this.specialties = res;
      });
  }

  loadModules() {
    this.modulesService.getModules()
      .subscribe(res => {
        this.modules = res;
      });
  }

  loadCategories() {
    this.categoriesService.getCategories()
      .subscribe(res => {
        this.categories = res;
      });
  }

}
