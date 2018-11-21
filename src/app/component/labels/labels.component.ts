import { Component, OnInit, ElementRef, ViewChild ,OnDestroy} from '@angular/core';
import { DataService } from '../../core/services/data/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})

export class LabelsComponent implements OnInit,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  notes: any[];

  private display;
  private labelId = localStorage.getItem('id');
  private id = localStorage.getItem('userId')
  private token = localStorage.getItem('token')

  constructor(private dataService: DataService, private dialog: MatDialog, private matSnackBar: MatSnackBar,private notesService:NotesService) { }

  @ViewChild('labels') labels: ElementRef;
  @ViewChild('newLabel') newLabel: ElementRef;

  ngOnInit() {
    var token = localStorage.getItem('token');
    this.notesService.getlabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      LoggerService.log('result', res);
      this.notes = [];
      this.notes = (res['data'].details);
      this.notes.sort(function(a, b){
        var nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase()
        if (nameA < nameB) 
            return -1 
        if (nameA > nameB)
            return 1
        return 0 
    })
    }, error => {
      LoggerService.log(error);
    })
  }

  /*   calling add Labels Api
   */
  addLabel() {
    LoggerService.log(this.id);
    if (!this.notes.some((data) => data.label == this.labels.nativeElement.innerHTML)) {
      this.notesService.postNoteLabels(
        {
          "label": this.labels.nativeElement.innerHTML,
          "isDeleted": false,
          "userId": this.id
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            LoggerService.log("POST Request is successful ", data);
            this.matSnackBar.open("Label Added", 'Successfully', {
              duration: 3000,
            });
            
            LoggerService.log('data', data);
          },
          error => {
            LoggerService.log("Error", error);
          })
    }
    else {
      LoggerService.log('label exists');
    }
  }


  /*   calling delete Label Api
  */
  deleteLabel(id) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'trash' }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      LoggerService.log('The dialog was closed');
      if (data) {
        this.notesService.deletedata(id)
        .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            LoggerService.log('data', data);
            this.dataService.changeEvent(true);
            if (data) {
              this.getLabels();
            }
          }, error => {
            LoggerService.log(error);
          })
      }
    });
  }


  /*   calling update label Api
   */
  updateLabel(id) {
    LoggerService.log(this.id);
    console.log( 'native',this.newLabel.nativeElement.innerHTML);
    
    this.notesService.postUpdateNotelabel(id,
      {
        "label": this.newLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id,
        "id": id
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          LoggerService.log("UPDATE Request is successful ", data);
          LoggerService.log('data', data);
        },
        error => {
          LoggerService.log("Error", error);
        })
  }

  update(id) {
    this.display = id
  }

  /*   calling get Labels Api
   */
  getLabels() {
    var token = localStorage.getItem('token');
    this.notesService.getlabels(
      
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      LoggerService.log('data', data);
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      LoggerService.log(error);
    })
  }

  /*
  This method will be executed just before Angular destroys the components
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


