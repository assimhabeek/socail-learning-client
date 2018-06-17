import { Component, ViewChild, HostBinding, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { PublicationService } from '../publication/publication.service';
import { SpecialtiesService } from '../specialties.service';
import { ModulesService } from '../modules.service';
import { CategoriesService } from '../categories.service';
import { UsersService } from '../auth/users.service';
import { User } from '../domain/user';
import { fadeAnimation, slideAnimation } from '../../shared/animations';
import { NotificationService, Notification } from '../notification.service';
import { Publication } from '../domain/publication';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation, slideAnimation],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @ViewChild('form') ngForm: NgForm;

  filter: any = {};
  publicationSize = 1;
  publications: any[] = [];
  categories: any[] = [];
  specialties: any[] = [];
  modules: any[] = [];
  total: number;
  openFilter = false;
  currentUser: User;
  compact = false;

  constructor(public publicationsService: PublicationService,
    public specialtiesService: SpecialtiesService,
    public modulesService: ModulesService,
    public categoriesService: CategoriesService,
    public usersService: UsersService) {
  }

  ngOnInit() {
    this.filter.page = 0;
    this.loadCategories();
    this.loadSpecialties();
    this.loadModules();
    this.loadUser();
    this.listenToFormChange();
    this.publicationsService.strem.subscribe(res => {
      if (isNaN(res)) {
        const pub: Publication = JSON.parse(res);
        this.publications = this.publications.filter(ite => ite.id !== pub.id);
        this.publications.unshift(pub);
      } else {
        this.publications = this.publications.filter(item => item.id !== +res);
      }
    });

  }




  tabChanged(e) {
    this.filter[e.index == 1 ? 'fPage' : 'page'] = 0;
    this.filter[e.index == 0 ? 'fPage' : 'page'] = undefined;
    this.filterPublications();
  }

  toggleFilter() {
    this.openFilter = !this.openFilter;
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
        this.publications = res[1];
        this.total = res[0];
      });
  }


  pageChanged($event, type: number) {
    this.filter[type == 1 ? 'fPage' : 'page'] = $event.pageIndex;
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

  zoomIn() {
    this.publicationSize = this.publicationSize == 3 ? this.publicationSize : this.publicationSize + 0.2;
  }

  zommOut() {
    this.publicationSize = this.publicationSize == 0.2 ? this.publicationSize : this.publicationSize - 0.2;
  }

  toggleCompcat() {
    this.compact = !this.compact;
    this.publicationSize = !this.compact ? 1 : 10000;
  }
}
