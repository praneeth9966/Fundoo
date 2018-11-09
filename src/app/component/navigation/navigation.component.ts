import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { DataService } from '../../core/services/data/data.service'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  gridList = 0;
  public firstName = localStorage.getItem('firstName');
  public lastName = localStorage.getItem('lastName');
  public email = localStorage.getItem('email');
  emailId;
  myEmail;
  notes;
  searchBar;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(public dataservice: DataService, public dialog: MatDialog, private breakpointObserver: BreakpointObserver, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.emailId = this.email.split("");
    this.myEmail = this.emailId[0];
    
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
    });
  }

  labelList() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
     
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      console.log(error);
    })
  }


  image = {};
  selectedFile = null;
  public image2 = localStorage.getItem('imageUrl');
  img = "http://34.213.106.173/" + this.image2;

  onFileUpload(event) {
    var token = localStorage.getItem('token');
    this.selectedFile = event.path[0].files[0];
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
    this.httpService.httpAddImage('user/uploadProfileImage', uploadData, token).subscribe(res => {
      console.log(res);
      console.log("url: ", res['status'].imageUrl)
      this.img = "http://34.213.106.173/" + res['status'].imageUrl;
      localStorage.setItem('imageUrl',res['status'].imageUrl);
    }, error => {
      console.log(error);
    })
  }

  navigation() {
    this.router.navigate(['homepage/search'])
  }
  message() {
    this.dataservice.changeMessage(this.searchBar)
  }

  gridOpen() {
    this.gridList = 1;
    this.dataservice.observerViewList(true);
  }
  gridClose() {
    this.gridList = 0;
    this.dataservice.observerViewList(false);
  }
  
}

