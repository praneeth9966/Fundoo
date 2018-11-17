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
  selectArray = [];
  selectLabelArray = [];
  public newLabel;
  public tempArray = [];
  public newList;
  public newData: any = {}
  public modifiedCheckList;
  public checklist = false;
  token = localStorage.getItem('token');
  public removedList;
  public adding = false;
  public addCheck = false;
  public status = "open"
  // public bgcolor=this.data.color;

  constructor(public httpService: HttpService,
    public dialogRef: MatDialogRef<NotesCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.selectArray = this.data['reminder'];
    LoggerService.log('selectArray',this.selectArray);
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
      }

      this.httpService.httpUpdateNotes('notes/updateNotes', this.body, token)
        .subscribe(data => {
          LoggerService.log('data',data);
        })
    }
    else {
       /*   calling update checklist Api
      */
      var apiData = {
        "itemName": this.modifiedCheckList.itemName,
        "status": this.modifiedCheckList.status
      }
      var url = "notes/" + this.data['id'] + "/checklist/" + this.modifiedCheckList.id + "/update";
      this.httpService.httpDeleteNotes(url, JSON.stringify(apiData), token).subscribe(response => {
        LoggerService.log('response',response);
       
      })
    }

    error => {
      LoggerService.log("error", error);
    }
    this.dialogRef.close();
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
    var url = "notes/" + this.data['id'] + "/checklist/" + this.removedList.id + "/remove";
    this.httpService.httpDeleteNotes(url, null, this.token).subscribe((response) => {
      LoggerService.log('response',response);
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
      var url = "notes/" + this.data['id'] + "/checklist/add";
      this.httpService.httpDeleteNotes(url, this.newData, this.token)
        .subscribe(response => {
          LoggerService.log('response',response);
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          LoggerService.log(response['data'].details);
          this.tempArray.push(response['data'].details)
          LoggerService.log('tempArray',this.tempArray)
        })
    }
  }

   /*   calling remove Label Api
    */
  removeLabel(label, labelId) {
    this.labelBody = {
      "noteId": this.data.id,
      "lableId": labelId
    }
    this.httpService.httpPostArchive
      ('notes/' + this.data.id + '/addLabelToNotes/' + labelId + '/remove',
      this.labelBody, localStorage.getItem('token')).subscribe(result => {
        LoggerService.log('result',result);
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
    this.httpService.httpPostArchive('notes/removeReminderNotes', this.reminderBody, localStorage.getItem('token')).subscribe(result => {

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
}
