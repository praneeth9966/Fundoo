import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../core/services/data/data.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColloboratorDialogComponent } from '../colloborator-dialog/colloborator-dialog.component';
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.scss']
})
export class NotesCollectionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
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

  constructor(private notesService: NotesService, private dialog: MatDialog, private dataService: DataService) {
    this.dataService.currentEvent.subscribe(message => {
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
      maxWidth:'auto',
      panelClass: 'myapp-no-padding-dialog',
      data: notes
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
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
    this.notesService.postAddLabelnotesRemove(labelId, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.notifyParent.emit({
        });
      })
  }


  /*   calling remove reminder Api
   */
  removeReminder(id) {
    this.reminderBody = {
      "noteIdList": [id]
    }
    this.notesService.postRemoveReminders(this.reminderBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.notifyParent.emit({
        });
      })
  }

  getNotification($sevent) {
    this.notifyParent.emit({
    });
  }

  messageColor($event) {
    this.noteParent.emit();
    this.notifyParent.emit({
    });
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
    this.dataService.viewListObserver
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.toggle = message;
      })
  }

  checkBox(checkList, note) {
    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    this.modifiedCheckList = checkList;
    this.updatelist(note);
  }


  /*   calling update checklist Api
   */
  updatelist(id) {
    let checklistData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    let checkNew = JSON.stringify(checklistData);
    this.notesService.postUpdateChecklist(id, this.modifiedCheckList.id, checkNew)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
      })
  }


  /*   function for striking reminder
    */
  strikeReminder(date) {
    let currentReminder = new Date().getTime();
    let reminderValue = new Date(date).getTime();
    if (reminderValue > currentReminder) {
      return true;
    }
    //  else false;
  }
  labelRedirect(label) {
    this.dataService.changeLabel(label);
  }

  colloborator(collaborator) {
    this.dialog.open(ColloboratorDialogComponent, {
      width: '500px',
      maxWidth:'auto',
      panelClass: 'myapp-no-padding-dialog',
      data: collaborator
    });
  }

  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
