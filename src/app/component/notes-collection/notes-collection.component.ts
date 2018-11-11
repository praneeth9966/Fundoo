import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.scss']
})
export class NotesCollectionComponent implements OnInit {
  notes = [];
  toggle = false;
  interval;
  public labelBody = {};
  public reminderBody = {};
  modifiedCheckList: any;
  public isChecked=false;
  constructor(private httpService: HttpService, public dialog: MatDialog, private dataService: DataService) {
    this.dataService.currentEvent.subscribe(message => {
      console.log(message);
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
      position: { left: '450px' },
      data: notes
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notifyParent.emit({
      })
    });
  }

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
      console.log(error);
    })
  }

  removeReminder(id) {
    this.reminderBody = {
      "noteIdList": [id]
    }
    this.httpService.httpPostArchive('notes/removeReminderNotes', this.reminderBody, localStorage.getItem('token')).subscribe(result => {

      LoggerService.log('result', result);
      this.notifyParent.emit({
      });
    }, error => {
      console.log(error);
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
    console.log(event);

    this.trashParent.emit(event);
  }

  unArchive(event) {
    console.log(event);
    this.unArchiveParent.emit(event);
  }


  restoreFunc(event) {
    this.restoreParent.emit(event);
  }

  addReminder(event){
    this.notifyParent.emit();
  }

  gridView() {
    // debugger;
    this.dataService.viewListObserver.subscribe(message => {
      this.toggle = message;
      // console.log(message);

    })
  }
   
checkBox(checkList,note) {
  console.log(note);
  
      if (checkList.status == "open") {
        checkList.status = "close"
      }
      else {
        checkList.status = "open"
      }
      console.log(checkList);
      this.modifiedCheckList = checkList;
      this.updatelist(note);
    }
     
  updatelist(id){
    var checklistData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    console.log(checklistData);
    
    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
   var  checkNew=JSON.stringify(checklistData);
  
    this.httpService.httpDeleteNotes(url,checkNew,localStorage.getItem('token')).subscribe(response => {
      console.log(response);
  
    })
  }
  
  
  
}
