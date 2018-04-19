import { Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { Publication } from '../domain/publication';
import { User } from '../domain/user';
import { PublicationService } from './publication.service';
import { Specialty } from '../domain/spcialty';
import { Category } from '../domain/category';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { UsersService } from '../auth/users.service';
import { fadeAnimation } from '../../shared/animations';
import { SpecialtiesService } from '../specialties.service';
import { NotificationService } from '../notification.service';

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
  @Input() modules: Specialty[];

  private attachmentsAreFetched = false;
  private commentsAreFetched = false;

  newComment: any = {};

  constructor(private publicationService: PublicationService,
    private _dialog: MatDialog) {
  }

  ngOnInit() {
    this.resetComment();
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

  deletePublication() {
    const config = new MatDialogConfig();
    config.disableClose = true;
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
  user: User;

  constructor(private publicationService: PublicationService,
    private categoriesService: CategoriesService,
    private specialtiesService: SpecialtiesService,
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
    });

  }

  loadPublication(id) {
    this.publicationService.getPublication(id)
      .subscribe(res => {
        this.publication = res;
      });
  }

  loadUser() {
    this.userService.user.subscribe(res => {
      this.publication.userId = res.id;
    });
  }

  loadSpecialties() {
    this.specialtiesService.getSpecialties().subscribe(res => {
      this.specialties = res;
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
            console.log(res);
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
  selector: 'app-publication-delete',
  template: `
    <h1 mat-dialog-title>{{ 'DELETE_CONFIRMATION' | translate }}</h1>
    <mat-dialog-content>
      {{ 'ARE_YOU_SURE' | translate }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <div>
        <button mat-button (click)="disAgree()">{{ 'NO' | translate}}</button>
        <button mat-raised-button (click)="agree()" color="primary">{{ 'YES' | translate}}
        </button>
      </div>
    </mat-dialog-actions>`,
  styles: [`
    mat-dialog-content {
      padding: 20px;
    }
  `]
})
export class DeleteConfirmationComponent {


  constructor(private _dialogRef: MatDialogRef<DeleteConfirmationComponent>) {
  }

  disAgree() {
    this._dialogRef.close(false);
  }

  agree() {
    this._dialogRef.close(true);
  }


}
