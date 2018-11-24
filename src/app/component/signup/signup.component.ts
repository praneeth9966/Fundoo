import { Component, OnInit, Output, EventEmitter, HostListener ,OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']

})
export class SignupComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private signUpForm: FormGroup
  private records = {}
  private user: any = {}
  private service: any;
  private register: any;
  private cards = []
  private hide = true;

  @Output() hovered = new EventEmitter();

  @HostListener('mouseenter', ['$event'])
  onHover(e) {
    this.hovered.emit('howdy')
  }
  constructor(private matsnacbar: MatSnackBar,private userService:UsersService) { }
  
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
    this.records = this.userService.postsignup(this.register)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.matsnacbar.open("registration", "successful", {
        duration: 5000,
      })
    })
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  getErrorMessagefirstName() {
    return this.firstname.hasError('required') ? 'First Name is Required' :
      this.firstname.hasError('pattern') ? 'Invalid First Name' : '';
  }

  lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')])
  getErrorMessagelastName() {
    return this.lastname.hasError('required') ? 'Last Name is Required' :
      this.lastname.hasError('pattern') ? 'Invalid Last Name' : '';
  }

  password = new FormControl('', [Validators.required]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Password is required' :
      this.lastname.hasError('pattern') ? 'Invalid password' : '';
  }

  

  ngOnInit() {
    this.records = this.userService.getDataService1()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      let data = result['data'];
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].select = false;
        this.cards.push(data.data[i])
      }
    });

    this.records = this.userService.getDataService2()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
    });
  }

  respond(card) {
    this.service = card.name;
    card.select = !card.select;
    for (let i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) { continue }
      this.cards[i].select = false;
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
