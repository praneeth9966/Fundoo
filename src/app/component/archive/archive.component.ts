import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  array = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.myFunc();
  }

  /*   calling get archive Api
    */
  myFunc() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getArchiveNotesList', token).subscribe(res => {
      console.log(res);
      this.array = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        this.array.push(res['data']['data'][i]);
      }
    }, error => {
      console.log(error);
    })
  }

  /*   UnArchive event emitter function
    */
  get(event) {
    if (event) {
      this.myFunc();
    }
  }
  
}
