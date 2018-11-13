import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  temp: any = {
    "email": "",
  };

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(public resetService: HttpService, public snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  resetPassword() {
    console.log(this.temp.email);
    if (this.temp.email.length == 0) {
      console.log("Email is required");
      this.snackBar.open("Email is required ", "login unsuccessfull", {
        duration: 10000,
      });
    }
    else {
      this.resetService.postHttpData('user/reset', this.temp)
        .subscribe(
          data => {
            console.log("reset successfull,check your mail once");
            this.snackBar.open("reset successfull ", "successfull", {
              duration: 10000,
            });
          }),
        error => {
          console.log("Error", error);
          this.snackBar.open("enter valid details ", "login unsuccessfull", {
            duration: 10000,
          });
        }
    }
  }

}

