import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesCollectionComponent } from '../notes-collection/notes-collection.component';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
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
export class DialogComponent implements OnInit ,OnDestroy{
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
  private reminderIcon=[];
  private value;

  constructor(private notesService:NotesService,
    private dialogRef: MatDialogRef<NotesCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) { }

  ngOnInit() {
    this.selectArray = this.data['reminder'];
    this.color = this.data['color']
    LoggerService.log('selectArray', this.selectArray);
    this.selectLabelArray = this.data['noteLabels'];
    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data['noteCheckLists']
  }

  onNoClick(): void {
    var token = localStorage.getItem('token');
    if (this.checklist == false) {

      /*   calling update notes  Api
      */
      this.body = {
        'noteId': [this.data.id],
        'title': document.getElementById("newTitle").innerHTML,
        'description': document.getElementById("newDescription").innerHTML,
        'noteLabels': "",
        'color': '',
        'reminder':''
      }

      this.notesService.updatenotes('this.body')
      .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          LoggerService.log('data', data);
        })
    }
    else {

      /*   calling update checklist Api
     */
      var apiData = {
        "itemName": this.modifiedCheckList.itemName,
        "status": this.modifiedCheckList.status
      }
      this.notesService
      .postUpdateChecklist(this.data['id'], this.modifiedCheckList.id, null)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        LoggerService.log('response', response);

      })
    }

    error => {
      LoggerService.log("error", error);
    }
    this.dialogRef.close();
  }
  messageColor(event){
    console.log(event);
    
    this.color = event;

  }
  editing(editedList, event) {
    LoggerService.log(editedList);
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
    LoggerService.log(checkList);
    this.modifiedCheckList = checkList;
    this.onNoClick();
  }

  removeList(checklist) {
    LoggerService.log(checklist)
    this.removedList = checklist;
    this.removeCheckList()
  }

  /*   calling remove checklist Api
   */
  removeCheckList() {
    this.notesService.postChecklistRemove(this.data['id'],this.removedList.id ,{})
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      LoggerService.log('response', response);
      for (var i = 0; i < this.tempArray.length; i++) {
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
      this.notesService.postCheckListAdd(this.data['id'], this.newData)
      .pipe(takeUntil(this.destroy$)) 
      .subscribe(response => {
          LoggerService.log('response', response);
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          LoggerService.log(response['data'].details);
          this.tempArray.push(response['data'].details)
          LoggerService.log('tempArray', this.tempArray)
        })
    }
  }

  /*   calling remove Label Api
   */
  removeLabel(label, labelId) {
    
    this.notesService.postAddLabelnotesRemove(labelId,this.data.id,null)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
        LoggerService.log('result', result);
        const index = this.selectLabelArray.indexOf(label, 0);
        LoggerService.log(label, 'hiii');
        if (index > -1) {
          this.selectLabelArray.splice(index, 1);
        }

      }, error => {
        LoggerService.log(error);
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
      LoggerService.log('result', result);
      const index = this.selectArray.indexOf(items, 0);
      if (index > -1) {
        this.selectArray.splice(index, 1);
      }
    }, error => {
      LoggerService.log(error);
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
}
