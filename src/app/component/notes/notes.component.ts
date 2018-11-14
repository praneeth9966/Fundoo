import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  notes = [];
  notes1 = [];

  ngOnInit() {
    this.displayNotes();
    this.getPin();
  }


   /*   calling get notes Api
    */
  displayNotes() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      this.notes = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false && res['data']['data'][i].isPined == false)
          this.notes.push(res['data']['data'][i]);
      }
    }, error => {
      console.log(error);
    })
  }


   /*   calling get notes Api
    */
  getPin() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      this.notes1 = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false && res['data']['data'][i].isPined == true)
          this.notes1.push(res['data']['data'][i]);
      }
    }, error => {
      console.log(error);
    })
  }

  receiveMessage() {
    if (event) {
      this.displayNotes();
      this.getPin();
    }
  }

}
