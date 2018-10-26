import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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


        this.matSnackBar.open("Login Successful ", "Successful", {
          duration: 3000,

        });


        window.location.href = 'homepage';

      },
        error => {

          console.log("Error", error);
          this.matSnackBar.open("Email/Password invalid ", "Login Unsuccessful", {
            duration: 3000,
          });
        });


  }

}