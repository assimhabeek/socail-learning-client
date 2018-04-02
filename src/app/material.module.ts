import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTooltipModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule, MatSelectModule, MatSnackBarModule, MatExpansionModule
} from '@angular/material';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    ScrollDispatchModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    ScrollDispatchModule
  ],
})
export class MaterialModule {
}
