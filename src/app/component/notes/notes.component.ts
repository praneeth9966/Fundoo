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

  ngOnInit() {
    this.displayNotes()
  }

  displayNotes() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      
      this.notes = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false)
          this.notes.push(res['data']['data'][i]);
      }
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
