import { Component, OnInit ,OnDestroy} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { DataService } from '../../core/services/data/data.service'
import { CropImageComponent } from '../crop-image/crop-image.component';
import { environment } from '../../../environments/environment';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private gridList = 0;
  private firstName = localStorage.getItem('firstName');
  private lastName = localStorage.getItem('lastName');
  private email = localStorage.getItem('email');
  private emailId;
  private myEmail;
  private notes;
  private searchBar;
  private pic;
  private image = {};
  private selectedFile = null;
  private image2 = localStorage.getItem('imageUrl');
  private img = "http://34.213.106.173/" + this.image2;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  // titleNew: any;
  titleNew;
  message1;
  constructor(private dataservice: DataService, private dialog: MatDialog, private breakpointObserver: BreakpointObserver, private router: Router,private userService:UsersService,private notesService:NotesService) { }

  ngOnInit() {
    this.titleNew = "fundooNotes";
    this.dataservice.currentlabel
    .pipe(takeUntil(this.destroy$))
      .subscribe(message =>
        this.titleNew = message)
    this.emailId = this.email.split("");
    this.myEmail = this.emailId[0];
    this.labelList();
  }

  /*   calling Logout Api
   */
  logout() {
    var token = localStorage.getItem('token');
    this.userService.postlogout()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      LoggerService.log('data', data);
      localStorage.clear();
      window.location.replace('login')
    },
      error => {
        LoggerService.log("Error", error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '300px',
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      LoggerService.log('The dialog was closed');
      this.labelList()
    });
  }


  /*   calling get Labels Api
   */
  labelList() {
    var token = localStorage.getItem('token');
    this.notesService.getlabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
      this.notes.sort(function(a, b){
        var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase()
        if (nameA < nameB) 
            return -1 
        if (nameA > nameB)
            return 1
        return 0 
    })
    LoggerService.log(this.notes);
    }, error => {
      LoggerService.log(error);
    })
  }


  onFileUpload(event) {
    this.openDialogCrop(event);
    this.selectedFile = event.path[0].files[0];
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
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

  openDialogCrop(data): void {
    const dialogRef1 = this.dialog.open(CropImageComponent, {
      width: '600px',
      data: data
    });

    dialogRef1.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.dataservice.currentProfile.subscribe(message => this.pic = message)
      if (this.pic == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.profileUrl + this.image2;
      }
    });
  }
  changeTitle(title) {
    this.titleNew = title;
  }
  change(labels) {
    this.titleNew = labels.label

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

