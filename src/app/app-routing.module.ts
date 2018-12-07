import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { NotesComponent } from './component/notes/notes.component';
import { RemindersComponent } from './component/reminders/reminders.component';
import { TrashComponent } from './component/trash/trash.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { AuthGuard } from './core/services/auth-guard/auth.guard';
import { LabelsComponent } from './component/labels/labels.component';
import { SearchComponent } from './component/search/search.component';
import { ChangeLabelComponent } from './component/change-label/change-label.component'
import { QuestionAnswerComponent } from './component/question-answer/question-answer.component';
import { ProductcartComponent } from './component/productcart/productcart.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'homepage', component: HomepageComponent, children: [
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full'
      },
      {
        path: 'labels/:id',
        component: ChangeLabelComponent
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: 'reminders',
        component: RemindersComponent
      },
      {
        path: 'trash',
        component: TrashComponent
      },
      {
        path: 'labels',
        component: LabelsComponent
      },

      {
        path: 'notes/:noteid/questions',
        component: QuestionAnswerComponent
      },

      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      }
    ], canActivate: [AuthGuard]
  },
  { path:'productcart', component: ProductcartComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'resetpassword/:id', component: ResetPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
