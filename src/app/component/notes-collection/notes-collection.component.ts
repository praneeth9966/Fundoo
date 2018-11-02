import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {
  notes = [];
  interval;
  public labelBody = {};

  constructor(private httpService: HttpService,public dialog: MatDialog) { }

  @Output() notifyParent = new EventEmitter();
  @Output() noteParent = new EventEmitter();
  @Output() archiveParent = new EventEmitter();
  @Input() array;
  @Input() searchBar;

  ngOnInit() {
  }

  update(notes): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-padding-dialog',
      position: {left:'450px'},
      data: notes
    });

    dialogRef.afterClosed().subscribe(result => {
        this.notifyParent.emit({  
        })
    });
  }

  removeLabel(id,labelId) {
    this.labelBody = {
      "noteId": id,
      "lableId": labelId
    }
    this.httpService.httpPostArchive('notes/' + id + '/addLabelToNotes/' + labelId + '/remove', this.labelBody, localStorage.getItem('token')).subscribe(result => {
      console.log(result);
      this.notifyParent.emit({
      });
    }, error => {
      console.log(error);
    })
  }

  getNotification($event) {
    this.notifyParent.emit({
    });
  }

  messageColor($event) {
    this.noteParent.emit();
  }

  myArchiveNotes($event) {
    this.archiveParent.emit();
  }

}
