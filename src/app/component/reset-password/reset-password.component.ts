import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { Params } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private hide = true;
  private body = {
    "newPassword": ""
  }

  private password = new FormControl('', [Validators.required]);
  private records: any;

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Password is required' :
      this.password.hasError('pattern') ? 'Invalid password' : '';
  }

  constructor(private httpService: HttpService,private userService:UsersService, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['id'];
      LoggerService.log('token', this.token);
    });
  }

  reset() {
    this.records = this.httpService.httpPasswordUpdate('user/reset-password', this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.snackBar.open('Password Updation', 'Success', {
        duration: 3000,
      });
    }, error => {
      LoggerService.log("error", error);

      this.snackBar.open('Password Updation', 'Failed', {
        duration: 3000,
      });
    });
  }
  token(arg0: string, token: any, body: { "password": string; }): any {
    throw new Error("Method not implemented.");
  }


  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
