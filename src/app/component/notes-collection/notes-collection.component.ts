import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { RemindmeIconComponent } from '../remindme-icon/remindme-icon.component';
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.scss']
})
export class NotesCollectionComponent implements OnInit {
  private notes = [];
  private toggle = false;
  private interval;
  private labelBody = {};
  private reminderBody = {};
  private pinBody = {};
  private modifiedCheckList: any;
  private isChecked = false;
  private todayDate = new Date();
  private tomorrowDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 1)
@Input() string;
@Input() length;

  constructor(private httpService: HttpService, private dialog: MatDialog, private dataService: DataService) {
    this.dataService.currentEvent.subscribe(message => {
      LoggerService.log('message', message);
      if (message) {
        this.notifyParent.emit();
      }
    })
  }

  @Output() notifyParent = new EventEmitter();
  @Output() noteParent = new EventEmitter();
  @Output() archiveParent = new EventEmitter();
  @Output() unArchiveParent = new EventEmitter<boolean>();
  @Output() trashParent = new EventEmitter<boolean>();
  @Output() restoreParent = new EventEmitter<boolean>();
  @Input() array;
  @Input() searchBar;
  @Input() name;

  ngOnInit() {
    this.gridView();
  }


  update(notes): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-padding-dialog',
      // position: { left: '450px' },
      data: notes
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notifyParent.emit({
      })
    });
  }


  /*   calling remove Label Api
   */
  removeLabel(id, labelId) {
    this.labelBody = {
      "noteId": id,
      "lableId": labelId
    }
    this.httpService.httpPostArchive('notes/' + id + '/addLabelToNotes/' + labelId + '/remove', this.labelBody, localStorage.getItem('token')).subscribe(result => {
      LoggerService.log('result', result);
      this.notifyParent.emit({
      });
    }, error => {
      LoggerService.log(error);
    })
  }


  /*   calling remove reminder Api
   */
  removeReminder(id) {
    this.reminderBody = {
      "noteIdList": [id]
    }
    this.httpService.httpPostArchive('notes/removeReminderNotes', this.reminderBody, localStorage.getItem('token')).subscribe(result => {
      LoggerService.log('result', result);
      this.notifyParent.emit({
      });
    }, error => {
      LoggerService.log(error);
    })
  }

  getNotification($sevent) {
    this.notifyParent.emit({
    });
  }

  messageColor($event) {
    this.noteParent.emit();
  }

  myArchiveNotes($event) {
    this.archiveParent.emit();
  }

  trashFunc(event) {
    this.trashParent.emit(event);
  }

  unArchive(event) {
    this.unArchiveParent.emit(event);
  }

  restoreFunc(event) {
    this.restoreParent.emit(event);
  }

  addReminder(event) {
    this.notifyParent.emit();
  }

  gridView() {
    this.dataService.viewListObserver.subscribe(message => {
      this.toggle = message;
    })
  }

  checkBox(checkList, note) {
    LoggerService.log(note);
    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    LoggerService.log(checkList);
    this.modifiedCheckList = checkList;
    this.updatelist(note);
  }


  /*   calling update checklist Api
   */
  updatelist(id) {
    var checklistData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    LoggerService.log('checklistData', checklistData);
    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
    var checkNew = JSON.stringify(checklistData);
    this.httpService.httpDeleteNotes(url, checkNew, localStorage.getItem('token')).subscribe(response => {
      LoggerService.log('response', response);
    })
  }


  /*   function for striking reminder
    */
  strikeReminder(date) {
    var currentReminder = new Date().getTime();
    var reminderValue = new Date(date).getTime();
    if (reminderValue > currentReminder) {
      return true;
    }
    else false;
  }
  labelRedirect(label) {
    this.dataService.changeLabel(label);
  }

}
