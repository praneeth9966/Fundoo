import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NotesCollectionComponent } from '../notes-collection/notes-collection.component';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColloboratorDialogComponent } from '../colloborator-dialog/colloborator-dialog.component';
import { Router } from '@angular/router';
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
export class DialogComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private body;
  private labelBody = {};
  private archive = { 'isArchived': false }
  private reminderBody: { "noteIdList": any[]; };
  private selectArray = [];
  private selectLabelArray = [];
  private newLabel;
  color;
  private tempArray = [];
  private newList;
  private newData: any = {}
  private modifiedCheckList;
  private checklist = false;
  private token = localStorage.getItem('token');
  private removedList;
  private adding = false;
  private addCheck = false;
  private status = "open";
  private reminderIcon = [];
  private value;

  constructor(private notesService: NotesService,private dialog:MatDialog,
    private route:Router,private dialogRef: MatDialogRef<NotesCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) { }

  ngOnInit() {
    this.selectArray = this.data['reminder'];
    this.color = this.data['color']
    this.selectLabelArray = this.data['noteLabels'];
    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data['noteCheckLists']
  }

  onNoClick(): void {
    if (this.checklist == false) {

      /*   calling update notes  Api
      */
      this.body = {
        'noteId': [this.data.id],
        'title': document.getElementById("newTitle").innerHTML,
        'description': document.getElementById("newDescription").innerHTML,
        'noteLabels': "",
        'color': '',
        'reminder': ''
      }

      this.notesService.updatenotes(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
        })
    }
    else {

      /*   calling update checklist Api
     */

      let apiData = {
        "itemName": this.modifiedCheckList.itemName,
        "status": this.modifiedCheckList.status
      }

      this.notesService
        .postUpdateChecklist(this.data['id'], this.modifiedCheckList.id, apiData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
        })
    }
    this.dialogRef.close();
  }
  messageColor(event) {
    console.log(event);

    this.color = event;

  }
  editing(editedList, event) {
    if (event.code == "Enter") {
      this.modifiedCheckList = editedList;
      this.onNoClick();
    }
  }

  checkBox(checkList) {
    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    this.modifiedCheckList = checkList;
    this.onNoClick();
  }

  removeList(checklist) {
    this.removedList = checklist;
    this.removeCheckList()
  }

  /*   calling remove checklist Api
   */
  removeCheckList() {
    this.notesService.postChecklistRemove(this.data['id'], this.removedList.id, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        for (let i = 0; i < this.tempArray.length; i++) {
          if (this.tempArray[i].id == this.removedList.id) {
            this.tempArray.splice(i, 1)
          }
        }
      })
  }

  /*   calling add checklist Api
      */
  addList(event) {
    if (this.newList != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    if (event.code == "Enter") {
      if (this.addCheck == true) {
        this.status = "close";
      }
      else {
        this.status = "open"
      }

      this.newData = {
        "itemName": this.newList,
        "status": this.status
      }
      this.notesService.postCheckListAdd(this.data.id, this.newData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          this.tempArray.push(response['data'].details)
        })
    }
  }

  /*   calling remove Label Api
   */
  removeLabel(label, labelId) {

    this.notesService.postAddLabelnotesRemove(labelId, this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        const index = this.selectLabelArray.indexOf(label, 0);
        if (index > -1) {
          this.selectLabelArray.splice(index, 1);
        }

      })
  }

  /*   calling remove Reminder Api
   */
  removeReminder(items, id) {
    this.reminderBody = {
      "noteIdList": [this.data.id]
    }
    this.notesService.postRemoveReminders(this.reminderBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        const index = this.selectArray.indexOf(items, 0);
        if (index > -1) {
          this.selectArray.splice(index, 1);
        }
      })
  }

  getNotification(event) {
  }

  reminderIconParent(event) {
    if (event) {
      this.reminderIcon = [];
      this.reminderIcon.push(event);
      this.value = event;
    }
  }

  /*
  This method will be executed just before Angular destroys the components
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  colloborator(noteData) {
    this.dialog.open(ColloboratorDialogComponent, {
      width: '500px',
      maxWidth:'auto',
      panelClass: 'myapp-no-padding-dialog',
      data: noteData
    });
  }

  redirectToQuestion(noteid){
    this.route.navigate(['/homepage/notes/'+noteid+'/questions'])
  }
}
