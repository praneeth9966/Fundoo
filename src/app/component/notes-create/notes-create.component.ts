import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.css']
})

export class NotesCreateComponent implements OnInit {
  public show: boolean = true;
  public checkList: boolean = false;
  token = localStorage.getItem('token');
  public title;
  public description;
  parentColor="#ffffff";
  labelBody={};
  array1=[];
  array2=[];
  notes = [];
  archive={'isArchived':false}
  constructor(private httpService: HttpService) { }
  @Output() messageEvent = new EventEmitter();

  ngOnInit() {
  }

  checkListButton(){
    this.show = !this.show
    this.checkList= true
  }

  open() {
    this.show = !this.show
  }

  close() {
    this.show = !this.show;
    this.checkList= false;
  // this.array2=[];
  }

  changeParentColor(event){
      if(event)
      this.parentColor=event;
      console.log(this.parentColor);
  }

  createNotes() {
    this.title = document.getElementById("titleId").innerHTML
    this.description = document.getElementById("takeANoteId").innerHTML
    var body = {
      'title': this.title,
      'description': this.description,
      'labelIdList': JSON.stringify(this.array2),
      'checkList': '',
      'isPinned': 'false',
      'color' : ""
    }
    body.color=this.parentColor;
    this.parentColor="#ffffff";
    console.log(this.title);
    this.httpService.httpAddNotes('notes/addNotes', body, this.token)
      .subscribe(data => {
        console.log(data);
        this.array1=[];
        this.array2=[];
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


  clickFunc(temp){
    if (!this.array2.some((data) => data == temp.label))
    {
      this.array1.push(temp.id);
    this.array2.push(temp.label);
    }
    else{
    const index = this.array2.indexOf(temp.label, 0);
    if (index > -1) {
      this.array2.splice(index, 1);
    }
      }
    }
    
 
    
}
