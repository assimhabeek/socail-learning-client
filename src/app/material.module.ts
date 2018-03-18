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
  MatDialogModule, MatSelectModule
} from '@angular/material';

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
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
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
    MatDialogModule
  ],
})
export class MaterialModule {
}
