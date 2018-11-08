import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule }    from '@angular/common/http';
import { MatSnackBarModule, MatSidenavModule, MatListModule } from "@angular/material";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { HttpService }  from './services/http.service';
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
import { MatMenuModule} from '@angular/material/menu';
import { RemindmeIconComponent } from './component/remindme-icon/remindme-icon.component';
import { CollaboratorIconComponent } from './component/collaborator-icon/collaborator-icon.component';
import { ChangeColorIconComponent } from './component/change-color-icon/change-color-icon.component';
import { AddImageIconComponent } from './component/add-image-icon/add-image-icon.component';
import { ArchiveIconComponent } from './component/archive-icon/archive-icon.component';
import { MoreIconComponent } from './component/more-icon/more-icon.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NotesCreateComponent } from './component/notes-create/notes-create.component';
import { NotesCollectionComponent } from './component/notes-collection/notes-collection.component';
import { DialogComponent } from './component/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LabelsComponent } from './component/labels/labels.component';

import { MatCheckboxModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import { SearchPipe } from './search.pipe';
import { SearchComponent } from './component/search/search.component';
import {DataService} from './services/data.service';
import { ChangeLabelComponent } from './component/change-label/change-label.component';
import { DeleteDialogComponent } from './component/delete-dialog/delete-dialog.component';

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
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule
  ],
  entryComponents:[DialogComponent,DeleteDialogComponent],
  providers: [HttpService,DataService,MatDatepickerModule],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
