import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private temp: any = {
    "email": "",
  };

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(private snackBar: MatSnackBar,private userService:UsersService) { }

  ngOnInit() {

  }

  resetPassword() {
    LoggerService.log(this.temp.email);
    if (this.temp.email.length == 0) {
      LoggerService.log("Email is required");
      this.snackBar.open("Email is required ", "login unsuccessfull", {
        duration: 10000,
      });
    }
    else {
      this.userService.postreset(this.temp)
      .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            LoggerService.log("reset successfull,check your mail once");
            this.snackBar.open("reset successfull ", "successfull", {
              duration: 10000,
            });
          }),
        error => {
          LoggerService.log("Error", error);
          this.snackBar.open("enter valid details ", "login unsuccessfull", {
            duration: 10000,
          });
        }
    }
  }

  /*
  This method will be executed just before Angular destroys the components
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

