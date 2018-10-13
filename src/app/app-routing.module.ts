import { NgModule } from '@angular/core';
import{ RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { FirstPageComponent } from './component/first-page/first-page.component';
const appRoutes: Routes=[
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'homepage',component:HomepageComponent,children: [
    {
        path:'first',
        component: FirstPageComponent
    }
  ]
},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'resetpassword/:id',component:ResetPasswordComponent},
  {path:'',redirectTo: '/login',pathMatch:'full'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)

  ],
  exports:[ RouterModule]
})
export class AppRoutingModule { }
