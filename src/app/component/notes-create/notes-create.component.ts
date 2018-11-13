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
  public addCheck=false;
  checklist = [];
  public body: any = {};
  dataArrayApi: any = [];
  public adding:boolean
  public isChecked=false;
  public i = 0;

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
  }

  changeParentColor(event) {
    if (event)
      this.parentColor = event;
  }

  createNotes() {
    this.title = document.getElementById("titleId").innerHTML
    console.log(this.title);
    if (this.checkList == false) {
      this.description = document.getElementById("takeANoteId").innerHTML
      this.body = {
        'title': this.title,
        'description': this.description,
        'labelIdList': JSON.stringify(this.array1),
        'checkList': '',
        'isPinned': 'false',
        'color': ''
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
      console.log("dataArrayapi", this.dataArrayApi);
      this.body = {
        "title": this.title,
        "checklist": JSON.stringify(this.dataArrayApi),
        "isPined": '',
        "color": "",
        "labelIdList": JSON.stringify(this.array1),
      }
      console.log(this.body);
      this.body.color = this.parentColor;
      this.parentColor = "#ffffff";
    }
    this.httpService.httpAddNotes('notes/addNotes', this.body, this.token)
      .subscribe(data => {
        console.log(data);
        // this.checkList = false;
        this.array1 = [];
        this.array2 = [];
        this.dataArrayApi=[];
        this.dataarray=[];
        this.adding=false
        this.messageEvent.emit({
        })
      })
    error => {
      console.log("error", error);
    }
  }


  getLabels() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
      console.log(data);
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      console.log(error);
    })
  }


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
    this.isChecked=this.addCheck;
    if (this.data != null  ) {
  
      var obj = {
        "index": this.i,
        "data": this.data,
        "isChecked":this.isChecked
      }
      this.dataarray.push(obj);
      LoggerService.log('dataArray',this.dataarray)
      this.data = null;
          this.adding=false;
          this.isChecked=false;
            this.addCheck = false;

    }
  }

  ondelete(deletedObj) {
    console.log("ondelete function runnig");
    for (var i = 0; i < this.dataarray.length; i++) {
      if (deletedObj.index == this.dataarray[i].index) {
        this.dataarray.splice(i, 1);
        break;
      }
    }
    console.log(this.dataarray);
  }
  

}
