import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IndexComponent } from './core/index/index.component';
import { UserSettingMenuComponent } from './core/index/user-setting/user-setting.component';
import { HttpService } from './core/http.service';
import { UsersService } from './core/auth/users.service';
import { TokenStorage } from './core/auth/token.storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NoConnectionComponent } from './core/no-connection/no-connection.component';
import { AccountComponent } from './core/account/account.component';
import { AuthModule } from './core/auth/auth.module';
import { LanguageSelectorModule } from './shared/language-selector/language-selector.module';
import { ThemePickerModule } from './shared/theme-picker/theme-picker.module';
import { HomeComponent } from './core/home/home.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SuccessMessageComponent } from './core/success-message/success-message.component';
import { SpecialtiesService } from './core/specialties.service';
import {
  AttachmentFormComponent,
  PublicationComponent,
  ReportPublicationComponent,
  PublicationFormComponent,
  PublicationPreviewComponent
} from './core/publication/publication.component';
import { Attachment } from './core/domain/attachments';
import { PublicationService } from './core/publication/publication.service';
import { TimeAgoPipe } from './shared/time-ago.pipe';
import { WsService } from './core/ws.service';
import { ModulesService } from './core/modules.service';
import { CategoriesService } from './core/categories.service';
import { NotificationService } from './core/notification.service';
import { NotificationComponent } from './core/notification/notification.component';
import { FaqComponent } from './core/faq/faq.component';
import { MemoComponent } from './core/memo/memo.component';
import { ChatComponent } from './core/chat/chat.component';
import { ChatService } from './core/chat/chat.service';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { OpinionService } from './core/opinion.service';
import { NgxEditorModule } from 'ngx-editor';
import { SafePipe } from './shared/safe.pipe';
import { FriendService } from './core/friend.service';
import { ChatVedioAudioComponent } from './core/chat/chat-vedio-audio/chat-vedio-audio.component';
import { ProfileComponent } from './core/profile/profile.component';
import { ValComponent } from './core/val/val.component';
import { SpeComponent } from './core/spe/spe.component';
import { ModComponent } from './core/mod/mod.component';
import { CatComponent } from './core/cat/cat.component';
import { DeleteConfirmationComponent } from './core/delete-confiremation/delete-confiremation.component';
import { CustomMaxDirective } from './shared/custom-max-validator.directive';
import { CustomMinDirective } from './shared/custom-min-validator.directive';
import { ContactsComponent } from './core/chat/contacts.component';
import { VedioCallerComponent } from './core/chat/vedio-caller.component';
import { ChatRequestedComponent } from './core/chat/chat-requested.component';
import { ChatRoomComponent } from './core/chat/chat-room.componen';
import { ConversationComponent } from './core/chat/conversation.component';
import { MessagesComponent } from './core/messages/messages.component';
import { SnackBarComponent } from './core/snak/snak.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NoConnectionComponent,
    UserSettingMenuComponent,
    AccountComponent,
    HomeComponent,
    PublicationComponent,
    SuccessMessageComponent,
    TimeAgoPipe,
    PublicationFormComponent,
    PublicationPreviewComponent,
    DeleteConfirmationComponent,
    AttachmentFormComponent,
    NotificationComponent,
    FaqComponent,
    ChatComponent,
    ReportPublicationComponent,
    SafePipe,
    ChatVedioAudioComponent,
    MemoComponent,
    ChatRequestedComponent,
    ProfileComponent,
    ValComponent,
    SpeComponent,
    ModComponent,
    CatComponent,
    CustomMaxDirective,
    CustomMinDirective,
    ContactsComponent,
    VedioCallerComponent,
    ChatRoomComponent,
    ConversationComponent,
    MessagesComponent,
    SnackBarComponent
  ],
  entryComponents: [
    SuccessMessageComponent,
    DeleteConfirmationComponent,
    ChatRequestedComponent,
    ReportPublicationComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    RoutingModule,
    StorageServiceModule,
    ThemePickerModule,
    ImageCropperModule,
    LanguageSelectorModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AuthModule,
    NgxEditorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  providers: [
    HttpService,
    TokenStorage,
    UsersService,
    WsService,
    FriendService,
    SpecialtiesService,
    ModulesService,
    CategoriesService,
    PublicationService,
    NotificationService,
    OpinionService,
    ChatService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ld9XFYUAAAAACxqpTBzHQh6yyYwzOHMoE-8TItT'
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

