import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule, MatMenuModule, MatTooltipModule, MatSidenavModule, MatListModule
} from '@angular/material';
import {BidiModule} from '@angular/cdk/bidi';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule
  ],
})
export class MaterialModule {
}
