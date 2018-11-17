import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss']
})

export class NotesCreateComponent implements OnInit {
  public show: boolean = true;
  public checkList: boolean = false;
  token = localStorage.getItem('token');
  public title;
  public description;
  parentColor = "#ffffff";
  labelBody = {};
  array1 = [];
  array2 = [];
  notes = [];
  archive = { 'isArchived': false }
  dataarray: any = [];
  data;
  status = "open";
  public addCheck = false;
  checklist = [];
  public body: any = {};
  dataArrayApi: any = [];
  public adding: boolean
  public isChecked = false;
  public i = 0;
  public reminderIcon = [];
  value;
  todayDate = new Date();
  tomorrowDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 1)

  constructor(private httpService: HttpService) { }

  @Output() messageEvent = new EventEmitter();

  ngOnInit() {
  }

  checkListButton() {
    this.show = !this.show
    this.checkList = true
  }

  open() {
    this.show = !this.show
  }

  close() {
    this.show = !this.show;
    this.array2 = [];
  }

  changeParentColor(event) {
    if (event)
      this.parentColor = event;
  }


  /*   calling add notes Api
   */
  createNotes() {

    this.title = document.getElementById("titleId").innerHTML
    LoggerService.log('title', this.title);
    if (this.checkList == false) {
      this.description = document.getElementById("takeANoteId").innerHTML
      this.body = {
        'title': this.title,
        'description': this.description,
        'labelIdList': JSON.stringify(this.array1),
        'checkList': '',
        'isPinned': 'false',
        'color': '',
        'reminder': ''
      }
      if (this.value != undefined) {

        this.body.reminder = this.value;

      }
      this.body.color = this.parentColor;
      this.parentColor = "#ffffff";
    }

    else {

      this.checkList = false;
      this.dataArrayApi = [];
      for (var i = 0; i < this.dataarray.length; i++) {
        if (this.dataarray[i].isChecked == true) {
          this.status = "close"
        }
        var apiObj = {
          "itemName": this.dataarray[i].data,
          "status": this.status
        }
        this.dataArrayApi.push(apiObj)
        this.status = "open"
      }
      LoggerService.log('dataArrayApi', this.dataArrayApi);
      this.body = {
        "title": this.title,
        "checklist": JSON.stringify(this.dataArrayApi),
        "isPined": '',
        "color": "",
        "labelIdList": JSON.stringify(this.array1),
        "reminder": ''
      }
      if (this.value != undefined) {

        this.body.reminder = this.value;

      }
      LoggerService.log(this.body);
      this.body.color = this.parentColor;
      this.parentColor = "#ffffff";
    }
    this.httpService.httpAddNotes('notes/addNotes', this.body, this.token)
      .subscribe(data => {
        LoggerService.log('data', data);
        // this.checkList = false;
        this.array1 = [];
        this.array2 = [];
        this.dataArrayApi = [];
        this.dataarray = [];
        this.reminderIcon = [];
        this.value = '';
        this.adding = false
        this.messageEvent.emit({
        })
      })
    error => {
      LoggerService.log('error', error);
    }
  }


  /*   calling get Labels Api
   */
  getLabels() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
      LoggerService.log('data', data);
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      LoggerService.log('error', error);
    })
  }


  /*  function for deleting particular label in notes create
   */
  clickFunc(temp) {
    if (!this.array2.some((data) => data == temp.label)) {
      this.array1.push(temp.id);
      this.array2.push(temp.label);
    }
    else {
      const index = this.array2.indexOf(temp.label, 0);
      if (index > -1) {
        this.array2.splice(index, 1);
      }
    }
  }

 
  enter(event) {
    if (this.data != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    this.i++;
    this.isChecked = this.addCheck;
    if (this.data != null) {

      var obj = {
        "index": this.i,
        "data": this.data,
        "isChecked": this.isChecked
      }
      this.dataarray.push(obj);
      LoggerService.log('dataArray', this.dataarray)
      this.data = null;
      this.adding = false;
      this.isChecked = false;
      this.addCheck = false;

    }
  }


  /*   function for deleting checklist
   */
  ondelete(deletedObj) {
    for (var i = 0; i < this.dataarray.length; i++) {
      if (deletedObj.index == this.dataarray[i].index) {
        this.dataarray.splice(i, 1);
        break;
      }
    }
  }

  reminderIconParent(event) {
    if (event) {
      // if (this.reminderIcon.length == 0)
      this.reminderIcon=[];
        this.reminderIcon.push(event);
      this.value = event;
    }


  }
  id = {
    'id': ''
  }

  delete() {
    this.reminderIcon = [];
  }

  deleteMsg(temp) {
    const index = this.array2.indexOf(temp, 0);
    if (index > -1) {
      this.array2.splice(index, 1);
    }
  }
}
