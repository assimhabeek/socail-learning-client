import { Inject, Component } from '@angular/core';
import { User } from '../domain/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

@Component({
    selector: 'app-chat-requested',
    template: `
    <h1 mat-dialog-title>{{ 'CHAT_REQUESTED' | translate }}</h1>
    <mat-dialog-content>
      <img  class="avatar mat-elevation-z6" [src]="data.profileImage"/>  
      <h3 mat-line><b>{{ data.lastName + ' ' + data.firstName | uppercase}}</b></h3>
      <p mat-line>{{ data.about }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <div>
        <button mat-button (click)="disAgree()">{{ 'REJECT' | translate}}</button>
        <button mat-raised-button (click)="agree()" color="primary">{{ 'ACCEPT' | translate}}
        </button>
      </div>
    </mat-dialog-actions>`,
    styles: [`
    .avatar{
      border-radius:50%
    } 

    mat-dialog-content {
      text-align:center;
      padding: 20px;
    }
  `]
})

export class ChatRequestedComponent {
    user: User;
    constructor(private _dialogRef: MatDialogRef<ChatRequestedComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    disAgree() {
        this._dialogRef.close(false);
    }

    agree() {
        this._dialogRef.close(true);
    }


}
