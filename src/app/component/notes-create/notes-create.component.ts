import { Component, OnInit, Output, EventEmitter,OnDestroy } from '@angular/core';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss']
})

export class NotesCreateComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private show: boolean = true;
  private checkList: boolean = false;
  private token = localStorage.getItem('token');
  private title;
  private description;
  private parentColor = "#ffffff";
  private labelBody = {};
  private array1 = [];
  private array2 = [];
  private notes = [];
  private archive = { 'isArchived': false }
  private dataarray: any = [];
  private data;
  private status = "open";
  private addCheck = false;
  private checklist = [];
  private body: any = {};
  private dataArrayApi: any = [];
  private adding: boolean
  private isChecked = false;
  private i = 0;
  private reminderIcon = [];
  private value;
  private todayDate = new Date();
  private tomorrowDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 1)

  constructor(private notesService:NotesService) { }

  @Output() messageEvent = new EventEmitter();
  @Output() newEvent = new EventEmitter();
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
    this.notesService.addnotes(this.body)
    .pipe(takeUntil(this.destroy$))
    .pipe(takeUntil(this.destroy$))
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
        this.newEvent.emit(data['status'].details)
      })
    error => {
      LoggerService.log('error', error);
    }
  }


  /*   calling get Labels Api
   */
  getLabels() {
    var token = localStorage.getItem('token');
    this.notesService.getlabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
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
      this.reminderIcon = [];
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


  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
