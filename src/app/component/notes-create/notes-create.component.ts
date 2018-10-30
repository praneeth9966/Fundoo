import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.css']
})

export class NotesCreateComponent implements OnInit {
  public show: boolean = true;
  token = localStorage.getItem('token');
  public title;
  public description;
  parentColor="#ffffff"
  constructor(private httpService: HttpService) { }
  @Output() messageEvent = new EventEmitter();

  ngOnInit() {
  }

  open() {
    this.show = !this.show
  }

  close() {
    this.show = !this.show;
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
      'labelIdList': '',
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
        this.messageEvent.emit({
        })
      })
    error => {
      console.log("error", error);
    }
  }

}
