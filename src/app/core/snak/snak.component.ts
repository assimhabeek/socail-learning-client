import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';


@Component({
    selector: 'snack-bar-componentk',
    templateUrl: 'snak.component.html'
})
export class SnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
        public ref: MatSnackBarRef<SnackBarComponent>) { }

    close() {
        this.ref.dismiss();
    }
}