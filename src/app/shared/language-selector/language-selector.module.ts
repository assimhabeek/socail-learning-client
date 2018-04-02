import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LanguageSelectorComponent} from './language-selector.component';
import {LanguageStorage} from './language.storage';
import {TranslateModule} from '@ngx-translate/core';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    CommonModule
  ],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent],
  providers: [LanguageStorage]
})
export class LanguageSelectorModule {
}
