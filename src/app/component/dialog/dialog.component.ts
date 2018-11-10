import { Component, OnInit, Inject, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { NotesCollectionComponent } from '../notes-collection/notes-collection.component';
import { LoggerService } from '../../core/services/logger/logger.service';

export interface DialogData {
  title: string;
  description: string;
  id: string;

}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  body;
  public labelBody = {};
  archive = { 'isArchived': false }
  reminderBody: { "noteIdList": any[]; };
  constructor(public httpService: HttpService,
    public dialogRef: MatDialogRef<NotesCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    var token = localStorage.getItem('token');


    this.body = {

      'noteId': [this.data.id],
      'title': document.getElementById("newTitle").innerHTML,
      'description': document.getElementById("newDescription").innerHTML,
      'noteLabels': ""

    }
    this.httpService.httpUpdateNotes('notes/updateNotes', this.body, token)
      .subscribe(data => {
        console.log(data);

      })
    error => {
      console.log("error", error);
    }
    this.dialogRef.close();
  }

  removeLabel(labelId) {
    this.labelBody = {
      "noteId": this.data.id,
      "lableId": labelId
    }
    this.httpService.httpPostArchive
      ('notes/' + this.data.id + '/addLabelToNotes/' + labelId + '/remove',
      this.labelBody, localStorage.getItem('token')).subscribe(result => {
        console.log(result);

        
      }, error => {
        console.log(error);
      })
  }

  removeReminder(id) {
    this.reminderBody = {
      "noteIdList": [this.data.id]
    }
    this.httpService.httpPostArchive('notes/removeReminderNotes', this.reminderBody, localStorage.getItem('token')).subscribe(result => {

      LoggerService.log('result', result);

    }, error => {
      console.log(error);
    })
  }

  getNotification(event) {

  }
}
