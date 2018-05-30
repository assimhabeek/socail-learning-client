import { Component, ViewChild, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { PublicationService } from '../publication/publication.service';
import { SpecialtiesService } from '../specialties.service';
import { ModulesService } from '../modules.service';
import { CategoriesService } from '../categories.service';
import { UsersService } from '../auth/users.service';
import { User } from '../domain/user';
import { fadeAnimation } from '../../shared/animations';
import { NotificationService, Notification } from '../notification.service';
import { Publication } from '../domain/publication';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit, OnDestroy {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @ViewChild('form') ngForm: NgForm;

  filter: any = {};
  currentTab: number = 0;
  publicationSize = 1.2;
  publications: any[] = [];
  categories: any[] = [];
  specialties: any[] = [];
  publicationStream;
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
    this.listenToFormChange();
    this.loadCategories();
    this.loadSpecialties();
    this.loadModules();
    this.loadUser();
    this.listenToStream();
  }


  ngOnDestroy() {
    this.publicationStream.unsubscribe();
  }

  listenToStream() {
    this.publicationStream = this.publicationsService.getStreamedPublications().subscribe(r => {
      if (isNaN(r.data)) {
        const pub: Publication = JSON.parse(r.data);
        this.notificationService.sendNotification(new Notification(pub.title, 'book', pub.user, false));
        this.publications = this.publications.filter(ite => ite.id !== pub.id);
        this.publications.unshift(pub);
      } else {
        this.publications = this.publications.filter(item => item.id !== +r.data);
      }
    });
  }

  tabChanged(e) {
    this.currentTab = e.index;
    this.filter[e.index == 1 ? 'fPage' : 'page'] = 0;
    this.filter[e.index == 0 ? 'fPage' : 'page'] = undefined;
    this.filterPublications();
  }

  listenToFormChange() {
    this.ngForm.valueChanges
      .debounceTime(400)
      .subscribe(res => {
        this.filterPublications();
      })
  }


  filterPublications() {
    this.publications = [];
    this.loadPublications();
  }

  loadPublications() {
    this.publicationsService.getPublications(this.filter)
      .subscribe(res => {
        this.publicationEnd = res.length === 0;
        this.publications = this.publications.concat(res);
      });
  }


  loadMore() {
    this.filter[this.currentTab == 0 ? 'page' : 'fPage'] += 1;
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

  getSpeByYear(year) {
    return this.specialties.filter(ite => ite.from <= year && ite.to >= year);
  }

  getModuleBySpeAndYear(sp, year) {
    return this.modules.filter(ite => ite.spcailtyId === sp && ite.year == year);
  }

  loadCategories() {
    this.categoriesService.getCategories()
      .subscribe(res => {
        this.categories = res;
      });
  }

}
