import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  public firstName = localStorage.getItem('firstName');
  public lastName = localStorage.getItem('lastName');
  public email = localStorage.getItem('email');
  emailId;
  myEmail;
  notes;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.emailId = this.email.split("");
    this.myEmail = this.emailId[0];
    console.log(this.myEmail);
    this.labelList();
  }

  logout() {
    var token = localStorage.getItem('token');
    this.httpService.httpLogout('/user/logout', token).subscribe(data => {
      console.log(data);
      localStorage.clear();
      window.location.replace('login')
    },
      error => {
        console.log("Error", error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.labelList()
      console.log(result);
      
    });
  }

  labelList() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
      console.log(data);
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      console.log(error);
    })
  }

}

