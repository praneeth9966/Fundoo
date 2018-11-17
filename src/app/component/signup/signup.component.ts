import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

// import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']

})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup
  records = {}


  user: any = {}
  service: any;
  register: any;
  cards = []


  onSubmit() {

    this.register = {
      "firstName": this.user.firstName,
      "lastName": this.user.lastName,
      "email": this.user.email,
      "emailVerified": true,
      "service": this.service,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "password": this.user.password
    }


  


    this.records = this.httpService.postHttpData('user/userSignUp', this.register).subscribe(result => {
      this.matsnacbar.open("registration", "successful", {
        duration: 5000,
      })
    }), error => {
      this.matsnacbar.open("registration", "failed", {
        duration: 5000,
      })

    }
  }

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  getErrorMessagefirstName() {
    return this.firstname.hasError('required') ? 'First Name is Required' :
      this.firstname.hasError('pattern') ? 'Invalid First Name' :
        '';
  }


  lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')])
  getErrorMessagelastName() {
    return this.lastname.hasError('required') ? 'Last Name is Required' :
      this.lastname.hasError('pattern') ? 'Invalid Last Name' :
        '';
  }



  password = new FormControl('', [Validators.required]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Password is required' :
      this.lastname.hasError('pattern') ? 'Invalid password' : '';
  }

  constructor(public httpService: HttpService, public matsnacbar: MatSnackBar) { }

  ngOnInit() {

    this.records = this.httpService.getHttpData('user/service').subscribe(result => {
      var data = result['data'];
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].select = false;
        this.cards.push(data.data[i])
      }

    });

    this.records = this.httpService.getHttpData('user').subscribe(result => {
      LoggerService.log("Registered Users=", result)
    });
  }

  respond(card) {
    this.service = card.name;
    card.select = !card.select;
    for (var i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) { continue }
      this.cards[i].select = false;
    }
  }

}
