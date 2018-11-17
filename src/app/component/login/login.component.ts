import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  records = {};

  body = {
    "email": "",
    "password": ""
  }
  email = new FormControl('', [Validators.required, Validators.email]);


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(public httpService: HttpService, public matSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  isLeftVisible = false;
  register() {
    if (!this.email.invalid) {
      this.isLeftVisible = !this.isLeftVisible
    }
    else {
      alert('invalid email');
    }
  }

  login() {
    this.records = this.httpService.postHttpData('user/login', this.body)
      .subscribe(data => {
        console.log(data);
        localStorage.setItem('token', data['id']);
        localStorage.setItem('firstName', data['firstName']);
        localStorage.setItem('lastName', data['lastName']);
        localStorage.setItem('userId', data['userId']);
        localStorage.setItem('email', data['email']);
        localStorage.setItem('imageUrl', data['imageUrl']);
        this.matSnackBar.open("Login Successful ", "Successful", {
          duration: 3000,
        });
       

        var token=localStorage.getItem('token');
        console.log(token,"token in login");
        
        var pushToken=localStorage.getItem('pushToken')
        console.log('pushtoken in login',pushToken);

        var body={
          "pushToken":pushToken
        }
        this.httpService.httpUpdateLabel('user/registerPushToken',body,token).subscribe(
          data=>{
            console.log("post of pushToken is successful****************************",data)
           
            window.location.href = 'homepage';
          }),
          error=>{
            console.log(error,"error in pushToken");
            
          }
      },
        error => {
          console.log("Error", error);
          this.matSnackBar.open("Email/Password invalid ", "Login Unsuccessful", {
            duration: 3000,
          });
        });
  }
}