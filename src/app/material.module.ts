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
  MatSliderModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatChipsModule,
  MatSlideToggleModule
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
    MatExpansionModule,
    MatChipsModule,
    MatSliderModule,
    MatSlideToggleModule
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
    ScrollDispatchModule,
    MatChipsModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
})
export class MaterialModule {
}
