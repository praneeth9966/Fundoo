import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { Params } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
hide = true;
  body ={
    "newPassword":""
  }
  
    

  password = new FormControl('', [Validators.required]);
  records: any;
 
  // httpService: any;
  // snackBar: any;
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Password is required' :
      this.password.hasError('pattern') ? 'Invalid password' : '';
  }
  constructor(public httpService: HttpService, public snackBar: MatSnackBar,public activatedRoute:ActivatedRoute) { }
 
  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['id'];
      console.log(this.token);
      });
  }

  reset(){
    this.records=this.httpService.httpPasswordUpdate('user/reset-password',this.token,this.body).subscribe(result=>{
    this.snackBar.open('Password Updation', 'Success', {
    duration: 3000,
    });
    },error=>{
      console.log("error",error);
      
    this.snackBar.open('Password Updation', 'Failed', {
    duration: 3000,
    });
    });
    }
  token(arg0: string, token: any, body: { "password": string; }): any {
    throw new Error("Method not implemented.");
  }

 

  

}
