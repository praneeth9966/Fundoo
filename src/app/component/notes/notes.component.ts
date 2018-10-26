import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  notes = [];
  ngOnInit() {
    this.displayNotes()
  }

  displayNotes() {
    this.notes=[];
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      console.log(res);
      
      for(var i=res['data']['data'].length-1;i>0;i--)
      {
        if(res['data']['data'][i].isDeleted==false && res['data']['data'][i].isArchived==false)
        this.notes.push(res['data']['data'][i]);
      }
      // this.notes = res['data']['data'].reverse();
    }, error => {
      console.log(error);
    })
  }

  receiveMessage() {
    if (event) {
      this.displayNotes();
    }
  }
}
