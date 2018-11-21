import { Component, OnInit, HostListener, Output, EventEmitter,OnDestroy} from '@angular/core';
import { FormControl } from '@angular/forms'
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() hovered = new EventEmitter();
  private hide = true;
  private records = {};
  private isLeftVisible = false;
  public body = {
    "email": "",
    "password": ""
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(private matSnackBar: MatSnackBar,private userService:UsersService,private notesService:NotesService) { }

  ngOnInit() {
  }

  register() {
    if (!this.email.invalid) {
      this.isLeftVisible = !this.isLeftVisible
    }
    else {
      alert('invalid email');
    }
  }

  @HostListener('mouseenter', ['$event'])
  onHover(e) {
    this.hovered.emit('howdy')
  }

  login() {
    this.records = this.userService.postlogin( this.body)
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('data', data);
        localStorage.setItem('token', data['id']);
        localStorage.setItem('firstName', data['firstName']);
        localStorage.setItem('lastName', data['lastName']);
        localStorage.setItem('userId', data['userId']);
        localStorage.setItem('email', data['email']);
        localStorage.setItem('imageUrl', data['imageUrl']);
        this.matSnackBar.open("Login Successful ", "Successful", {
          duration: 3000,
        });
        var token = localStorage.getItem('token');
        LoggerService.log(token, "token in login");
        var pushToken = localStorage.getItem('pushToken')
        LoggerService.log('pushtoken in login', pushToken);
        var body = {
          "pushToken": pushToken
        }
        this.notesService.postRegisterPushToken(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            LoggerService.log("post of pushToken is successful***********", data)
            window.location.href = 'homepage';
          }),
          error => {
            LoggerService.log(error, "error in pushToken");
          }
      },
        error => {
          LoggerService.log("Error", error);
          this.matSnackBar.open("Email/Password invalid ", "Login Unsuccessful", {
            duration: 3000,
          });
        });
  }

  
  /*
  This method will be executed just before Angular destroys the components
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}