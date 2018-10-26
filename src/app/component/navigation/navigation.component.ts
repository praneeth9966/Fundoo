import { Component,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  public firstName=localStorage.getItem('firstName');
  public lastName=localStorage.getItem('lastName');
  public email=localStorage.getItem('email');
  emailId;
  myEmail;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    

    
  constructor(private breakpointObserver: BreakpointObserver, private router: Router,private httpService:HttpService) {}
  
 ngOnInit(){
   this.emailId=this.email.split("");
   this.myEmail=this.emailId[0];
   console.log(this.myEmail);
 }
 
  
  logout(){
    var token= localStorage.getItem('token');
   
  this.httpService.httpLogout('/user/logout',token).subscribe(data=> {
    console.log(data);
    
    
    localStorage.clear();
    window.location.replace('login')
  },

  error => {

    console.log("Error", error);
    
  });
  
  }
  
  


  }

