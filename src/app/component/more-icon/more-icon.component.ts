import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '../../component/delete-dialog/delete-dialog.component';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.scss']
})

export class MoreIconComponent implements OnInit {
  notes: any[];
  httpservice: any;
  public display: boolean = true;
  model = {};
  token = localStorage.getItem('token');
  constructor(private httpService: HttpService, public dialog: MatDialog, public matSnackBar:MatSnackBar) { }
  body;
  public labelBody = {};
  @Output() deleteNote = new EventEmitter();
  @Output() addedLabel = new EventEmitter();
  @Output() trashEvent = new EventEmitter<boolean>();
  @Output() restoreEvent = new EventEmitter<boolean>();
  @Input() notesArray;
  @Input() name;
  ngOnInit() {

  }


   /*   calling delete notes Api
    */
  deleteNotes() {
    this.body = {
      "isDeleted": true,
      "noteIdList": [this.notesArray.id]
    }
    var token = localStorage.getItem('token');
    this.httpService.httpDeleteNotes('notes/trashNotes', this.body, token).subscribe(res => {
      LoggerService.log('result',res);
      this.matSnackBar.open("Notes deleted ",'Successfully',{
        duration: 3000,
      });
      this.deleteNote.emit();
    }, error => {
      LoggerService.log(error);
    })
  }


   /*   calling add Label Api
    */
  addLabel(labelId) {
    LoggerService.log(this.notesArray, "notess");
    LoggerService.log(this.notesArray.id);
    this.labelBody = {
      "noteId": this.notesArray.id,
      "lableId": labelId
    }
    this.httpService.httpPostArchive('notes/' + this.notesArray.id + '/addLabelToNotes/' + labelId + '/add', this.labelBody, localStorage.getItem('token')).subscribe(result => {
      LoggerService.log('result',result);
      this.deleteNote.emit();
    }, error => {
      LoggerService.log(error);
    })
  }


   /*   calling get Labels Api
    */
  getLabels() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
      LoggerService.log('',data);
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      LoggerService.log(error);
    })
  }


   /*   calling delete forever Api
    */
  deleteforever() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'trash' }
    });
    dialogRef.afterClosed().subscribe(data => {
      LoggerService.log('The dialog was closed');
      if (data) {
        this.model = {
          "isDeleted": true,
          "noteIdList": [this.notesArray.id]
        }
        this.httpService.httpPostArchive('notes/deleteForeverNotes', this.model, this.token).subscribe(data => {
          LoggerService.log('data',data);
          this.trashEvent.emit(true);
        }, error => {
          LoggerService.log(error);
        })
      }
    });
  }


   /*   calling restore Api
    */
  restore() {
    this.body = {
      "isDeleted": false,
      "noteIdList": [this.notesArray.id]
    }
    var token = localStorage.getItem('token');
    this.httpService.httpDeleteNotes('notes/trashNotes', this.body, token).subscribe(res => {
      LoggerService.log('result',res);
      this.matSnackBar.open("Notes restore",'Successfully',{
        duration: 3000,
      });
      this.restoreEvent.emit(true);
    }, error => {
      LoggerService.log(error);
    })
  }

}
