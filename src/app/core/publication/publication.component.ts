import { Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { Publication } from '../domain/publication';
import { User } from '../domain/user';
import { PublicationService } from './publication.service';
import { Specialty } from '../domain/spcialty';
import { Category } from '../domain/category';
import { Module } from '../domain/module';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { UsersService } from '../auth/users.service';
import { fadeAnimation } from '../../shared/animations';
import { SpecialtiesService } from '../specialties.service';
import { ModulesService } from '../modules.service';
import { NotificationService } from '../notification.service';
import { OpinionService } from '../opinion.service';
import { Opinion } from '../domain/opinion';
import { environment } from '../../../environments/environment';
import { DeleteConfirmationComponent } from '../delete-confiremation/delete-confiremation.component';
import * as moment from 'moment';

const OpinionType = {
  LIKE: 1,
  DISLIKE: 2,
  REPORT: 3
}

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  @Input() publication: Publication;
  @Input() currentUser: User;
  @Input() categories: Category[];
  @Input() specialties: Specialty[];
  @Input() modules: Module[];
  @Input() compcat: boolean;

  private attachmentsAreFetched = false;
  private commentsAreFetched = false;
  public openAttachments = false;
  public opinion: Opinion;
  newComment: any = {};
  public useRecaptch = window.location.protocol.indexOf('https') > -1;

  constructor(private publicationService: PublicationService,
    private opinionService: OpinionService,
    private _dialog: MatDialog) {
  }

  ngOnInit() {
    this.resetComment();
    this.loadOpinion();
  }

  showReCap() {
    if (!this.useRecaptch) {
      this.attachmentOpened();
    } else {
      this.openAttachments = true;
    }
  }

  loadOpinion() {
    if (this.currentUser) {
      this.opinionService.getOpinion(this.currentUser.id, this.publication.id)
        .subscribe(res => {
          this.opinion = res ? res : new Opinion(0, this.currentUser.id, this.publication.id, -1);
        });
    }
  }

  report(description: string) {
    if (this.opinion.opinion != OpinionType.REPORT) {
      this.opinion.opinion = OpinionType.REPORT;
      this.opinion.description = description;
      this.opinionService.postOpinion(this.opinion)
        .subscribe(res => {
          this.publication.likes = res.likes;
          this.publication.dislikes = res.dislikes;
        });
    }
  }

  like() {
    if (this.opinion.opinion != OpinionType.LIKE) {
      this.opinion.opinion = OpinionType.LIKE;
      this.opinionService.postOpinion(this.opinion)
        .subscribe(res => {
          this.publication.likes = res.likes;
          this.publication.dislikes = res.dislikes;
        });

    }
  }

  disLike() {
    if (this.opinion.opinion != OpinionType.DISLIKE) {
      this.opinion.opinion = OpinionType.DISLIKE;
      this.opinionService.postOpinion(this.opinion)
        .subscribe(res => {
          this.publication.likes = res.likes;
          this.publication.dislikes = res.dislikes;
        });
    }
  }

  markAsBest(commentId: number) {
    this.publicationService.markAsBest(this.publication.id, commentId)
      .subscribe(res => {
        console.log(this.publication.comments);
      });
  }

  resetComment() {
    this.newComment = {};
    this.newComment.userId = this.currentUser ? this.currentUser.id : 0;
    this.newComment.publicationId = this.publication ? this.publication.id : 0;
  }

  commented(state) {
    if (state) {
      moment.locale('en');
      this.newComment.date = moment().format('YYYY-MM-DD HH:mm:ss');
      this.publicationService.addComment(this.newComment)
        .subscribe(res => {
          this.resetComment();
        });
    }
  }

  attachmentOpened() {
    if (!this.attachmentsAreFetched) {
      this.attachmentsAreFetched = true;
      this.publicationService.getAttachments(this.publication.id)
        .subscribe((res) => {
          this.publication.attachments = res;
        });
    }
  }

  commentOpened() {
    if (!this.commentsAreFetched) {
      this.commentsAreFetched = true;
      this.publicationService.getComments(this.publication.id)
        .subscribe((res) => {
          this.publication.comments = res;
          this.publicationService.getStreamedComment(this.publication.id)
            .subscribe((comment) => {
              this.publication.comments.push(JSON.parse(comment.data));
            });
        });
    }
  }

  getSpecialtyById(id: number) {
    return this.specialties && this.specialties.find(item => item.id === id)
      ? this.specialties.find(item => item.id === id).abb : '';
  }

  getModuleById(id: number) {
    return this.modules && this.modules.find(item => item.id === id)
      ? this.modules.find(item => item.id === id).abb : '';
  }

  displaySpecialtyModule(modId: number, specId: number) {
    const mod = this.getModuleById(modId);
    const spe = this.getSpecialtyById(specId);

    return mod ? mod + '-' + spe : spe;
  }

  getCategoryById(id: number) {
    return this.categories && this.categories.find(item => item.id === id) ?
      this.categories.find(item => item.id === id).title : '';
  }

  reportPublication() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.width = '300px';
    this._dialog.open(ReportPublicationComponent, config).afterClosed()
      .subscribe(res => {
        if (res) {
          this.report(res);
        }
      });
  }

  deletePublication() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.data = 'ARE_YOU_SURE';
    this._dialog.open(DeleteConfirmationComponent, config).afterClosed()
      .subscribe(res => {
        if (res) {
          this.publicationService.deletePublication(this.publication.id).subscribe();
        }
      });
  }

}


@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss'],
  animations: [fadeAnimation]
})
export class PublicationFormComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';


  publication: any = {};
  attachments: any = [];
  categories: Category[];
  specialties: Specialty[];
  modules: Module[];
  user: User;
  htmlEditor = false;
  imageEndPoint = "https://" + environment.socket + "/upload";
  useRecaptch = window.location.protocol.indexOf('https') > -1;
  constructor(private publicationService: PublicationService,
    private categoriesService: CategoriesService,
    private specialtiesService: SpecialtiesService,
    private modulesService: ModulesService,
    private _dialog: MatDialog,
    private userService: UsersService,
    public route: ActivatedRoute,
    public router: Router) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (+id !== 0) {
        this.loadAttachmments(id);
        this.loadPublication(id);
      } else {
        this.publication.id = 0;
      }

      this.loadUser();
      this.loadCategories();
      this.loadSpecialties();
    });

  }

  loadPublication(id) {
    this.publicationService.getPublication(id)
      .subscribe(res => {
        this.publication = res;
        if (this.publication.specialtyId) {
          this.loadModules(this.publication.specialtyId);
        }
      });
  }

  loadUser() {
    this.userService.user.subscribe(res => {
      this.publication.userId = res.id;
    });
  }

  loadSpecialties() {
    this.specialtiesService.getSpecialties()
      .subscribe(res => {
        this.specialties = res;
      });
  }



  loadModules(spe: number) {
    this.modulesService.getModulesBySpecialty(spe)
      .subscribe(res => {
        this.modules = res;
      });
  }

  loadAttachmments(id: number) {
    this.publicationService.getAttachments(id)
      .subscribe(res => {
        this.attachments = res;
      });
  }

  addAttachment() {
    this.attachments.push({ id: 0, publicationId: this.publication.id });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  submit(state) {
    if (state) {
      moment.locale('en');
      this.publication.date = moment().format('YYYY-MM-DD HH:mm:ss');
      if (this.publication.id === 0) {
        this.publicationService.addPublication(this.publication)
          .subscribe(res => {
            this.publication.id = +res;
            this.router.navigate(['/index/publicationForm', +res]);
            this.useRecaptch = false;
          });
      } else {
        this.publicationService.editPublication(this.publication)
          .subscribe();
      }
    }
  }

  deleteAttachment($event) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    this._dialog.open(DeleteConfirmationComponent, config).afterClosed()
      .subscribe(res => {
        if (res) {
          this.attachments = this.attachments.filter(item => item !== $event);
          if ($event.id !== 0) {
            this.publicationService.deleteAttachment($event.id)
              .subscribe();
          }
        }
      });
  }


}


@Component({
  selector: 'app-publication-preview',
  templateUrl: './publication-preview.component.html',
  styleUrls: ['./publication-preview.component.scss'],
  animations: [fadeAnimation]
})
export class PublicationPreviewComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';


  public publication: any = {};
  public categories: Category[];
  public specialties: Specialty[];
  public modules: Module[];
  public currentUser: User;

  constructor(private publicationService: PublicationService,
    private categoriesService: CategoriesService,
    private specialtiesService: SpecialtiesService,
    private modulesService: ModulesService,
    private userService: UsersService,
    public route: ActivatedRoute,
    public router: Router) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (+id !== 0) {
        this.loadPublication(id);
        this.loadUser();
        this.loadCategories();
        this.loadSpecialties();
      } else {
        this.router.navigate['/index'];
      }

    });

  }

  loadPublication(id) {
    this.publicationService.getPublicationExtanded(id)
      .subscribe(res => {
        this.publication = res;
        if (this.publication.specialtyId) {
          this.loadModules(this.publication.specialtyId);
        }
      });
  }

  loadUser() {
    this.userService.user.subscribe(res => {
      this.currentUser = res;
    });
  }

  loadSpecialties() {
    this.specialtiesService.getSpecialties()
      .subscribe(res => {
        this.specialties = res;
      });
  }



  loadModules(spe: number) {
    this.modulesService.getModulesBySpecialty(spe)
      .subscribe(res => {
        this.modules = res;
      });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }




}


@Component({
  selector: 'app-attachment-form',
  templateUrl: './attachment-form.component.html'
})
export class AttachmentFormComponent {


  @Input() attachment;
  @Output() attachmentDelete: EventEmitter<any> = new EventEmitter();

  constructor(private attachmentService: PublicationService) {
  }


  submit(state) {
    if (state) {
      if (this.attachment.id === 0) {
        this.attachmentService.addAttachment(this.attachment)
          .subscribe(res => {
            this.attachment.id = res;
          });
      } else {
        this.attachmentService.editAttachment(this.attachment)
          .subscribe();
      }
    }
  }


  onDelete() {
    this.attachmentDelete.emit(this.attachment);
  }
}





@Component({
  selector: 'app-report-publication',
  templateUrl: 'report-publication.component.html',
  styles: [`
    mat-dialog-content {
      padding: 40px;
    }
  `]
})
export class ReportPublicationComponent {

  public description: string = '';

  constructor(private _dialogRef: MatDialogRef<ReportPublicationComponent>) {
  }

  submit(state) {
    if (state) {
      this._dialogRef.close(this.description);
    }
  }

  cancel() {
    this._dialogRef.close(null);
  }

}
