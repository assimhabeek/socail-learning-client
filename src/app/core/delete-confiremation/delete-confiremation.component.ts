import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-delete',
    templateUrl: './delete-confirmation.component.html',
    styles: [`
    mat-dialog-content {
      padding: 20px;
    }
  `]
})
export class DeleteConfirmationComponent {


    constructor(private _dialogRef: MatDialogRef<DeleteConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    disAgree() {
        this._dialogRef.close(false);
    }

    agree() {
        this._dialogRef.close(true);
    }

}
