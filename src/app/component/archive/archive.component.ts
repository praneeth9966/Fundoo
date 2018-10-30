import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  array = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.myFunc();
  }

  myFunc() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getArchiveNotesList', token).subscribe(res => {
      console.log(res);
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        this.array.push(res['data']['data'][i]);
      }
    }, error => {
      console.log(error);
    })
  }
}
