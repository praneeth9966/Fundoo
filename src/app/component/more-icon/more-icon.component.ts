import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '../../component/delete-dialog/delete-dialog.component';
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
      console.log(res);
      this.matSnackBar.open("Notes deleted ",'Successfully',{
        duration: 3000,
      });
      this.deleteNote.emit();
    }, error => {
      console.log(error);
    })
  }


   /*   calling add Label Api
    */
  addLabel(labelId) {
    console.log(this.notesArray, "notess");
    console.log(this.notesArray.id);
    this.labelBody = {
      "noteId": this.notesArray.id,
      "lableId": labelId
    }
    this.httpService.httpPostArchive('notes/' + this.notesArray.id + '/addLabelToNotes/' + labelId + '/add', this.labelBody, localStorage.getItem('token')).subscribe(result => {
      console.log(result);
      this.deleteNote.emit();
    }, error => {
      console.log(error);
    })
  }


   /*   calling get Labels Api
    */
  getLabels() {
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


   /*   calling delete forever Api
    */
  deleteforever() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'trash' }
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      if (data) {
        this.model = {
          "isDeleted": true,
          "noteIdList": [this.notesArray.id]
        }
        this.httpService.httpPostArchive('notes/deleteForeverNotes', this.model, this.token).subscribe(data => {
          console.log(data);
          this.trashEvent.emit(true);
        }, error => {
          console.log(error);
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
      console.log(res);
      this.matSnackBar.open("Notes restore",'Successfully',{
        duration: 3000,
      });
      this.restoreEvent.emit(true);
    }, error => {
      console.log(error);
    })
  }

}