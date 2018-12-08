import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, } from '@angular/core';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {
  MatSnackBarModule, MatSidenavModule, MatListModule, MatCheckboxModule, MatInputModule
  , MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule,
  MatAutocompleteModule, MatExpansionModule, MatDatepickerModule, MatMenuModule, MatTooltipModule,
  MatChipsModule, MatNativeDateModule,
} from "@angular/material";
import { HttpService } from './core/services/http/http.service';
import { SlidePanelComponent } from './component/slide-panel/slide-panel.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomepageComponent } from './component/homepage/homepage.component';
import { NotesComponent } from './component/notes/notes.component';
import { RemindersComponent } from './component/reminders/reminders.component';
import { TrashComponent } from './component/trash/trash.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { RemindmeIconComponent } from './component/remindme-icon/remindme-icon.component';
import { CollaboratorIconComponent } from './component/collaborator-icon/collaborator-icon.component';
import { ChangeColorIconComponent } from './component/change-color-icon/change-color-icon.component';
import { AddImageIconComponent } from './component/add-image-icon/add-image-icon.component';
import { ArchiveIconComponent } from './component/archive-icon/archive-icon.component';
import { MoreIconComponent } from './component/more-icon/more-icon.component';
import { NotesCreateComponent } from './component/notes-create/notes-create.component';
import { NotesCollectionComponent } from './component/notes-collection/notes-collection.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LabelsComponent } from './component/labels/labels.component';
import { SearchPipe } from './core/pipes/search.pipe';
import { SearchComponent } from './component/search/search.component';
import { DataService } from './core/services/data/data.service';
import { ChangeLabelComponent } from './component/change-label/change-label.component';
import { DeleteDialogComponent } from './component/delete-dialog/delete-dialog.component';
import { LoggerService } from './core/services/logger/logger.service';
import { CropImageComponent } from './component/crop-image/crop-image.component';
import { ImageCropperModule } from "ngx-image-cropper";
import { PinComponent } from './component/pin/pin.component';
import { MessagingService } from './core/services/messaging/messaging.service';
import { InterceptService} from './core/services/interceptor/intercept.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsHandler } from './core/services/errorhandler/errors-handler';
import { ColloboratorDialogComponent } from './component/colloborator-dialog/colloborator-dialog.component';
import { QuestionAnswerComponent } from './component/question-answer/question-answer.component';
import { BarRatingModule } from "ngx-bar-rating";
import { LoaderComponent } from './component/loader/loader.component';
import { ProductcartComponent } from './component/productcart/productcart.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProductcartDialogComponent } from './component/productcart-dialog/productcart-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { ShoppingcartComponent } from './component/shoppingcart/shoppingcart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SlidePanelComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavigationComponent,
    HomepageComponent,
    NotesComponent,
    RemindersComponent,
    TrashComponent,
    ArchiveComponent,
    RemindmeIconComponent,
    CollaboratorIconComponent,
    ChangeColorIconComponent,
    AddImageIconComponent,
    ArchiveIconComponent,
    MoreIconComponent,
    NotesCreateComponent,
    NotesCollectionComponent,
    DialogComponent,
    LabelsComponent,
    SearchPipe,
    SearchComponent,
    ChangeLabelComponent,
    DeleteDialogComponent,
    CropImageComponent,
    PinComponent,
    ColloboratorDialogComponent,
    QuestionAnswerComponent,
    LoaderComponent,
    ProductcartComponent,
    ProductcartDialogComponent,
    ShoppingcartComponent,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ImageCropperModule,
    BarRatingModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    MatTabsModule,
    MatStepperModule
  ],
  entryComponents: [DialogComponent, DeleteDialogComponent,CropImageComponent,NavigationComponent,ColloboratorDialogComponent,
    ProductcartDialogComponent],
  providers: [HttpService, DataService, MatDatepickerModule, LoggerService,MessagingService,InterceptService,{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptService,
    multi: true
  },{
    provide: ErrorHandler,
    useClass: ErrorsHandler,
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
