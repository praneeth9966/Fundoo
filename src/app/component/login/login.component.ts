import { Component, OnInit } from '@angular/core';
  import {FormGroup,FormControl} from '@angular/forms'
 import {Validators} from '@angular/forms';
 import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide=true;
records={};
users=[];
body = {
  "email":"",
  "password":""
}
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

   loginForm:FormGroup;
   constructor(public httpService: HttpService) { }

  ngOnInit() {
    this.loginForm=new FormGroup({
       fullName:new FormControl(),
       email:new FormControl()
     });
  }
   onSubmit():void{
     console.log( this.loginForm.value);
    
   }

   isLeftVisible = false;
register()
{
  if(!this.email.invalid)
  {
    this.isLeftVisible = !this.isLeftVisible
  }
  else{
    alert('invalid email');
  }
}



login(show){
  if(!show){
this.records = this.httpService.postHttpData('user/login', this.body)
.subscribe(result => {
console.log("post= ", result);
for (let key in result) {
}
});

  }
}
}