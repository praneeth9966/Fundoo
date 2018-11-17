import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public httpService: HttpService, public dataService: DataService) { }

  public searchBar;
  public token = localStorage.getItem('token');
  public notes = [];

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      LoggerService.log(message);
      this.searchBar = message;
      LoggerService.log(this.searchBar, "searchComponent");
      this.displayNotes();
    })
  }

  displayNotes() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      LoggerService.log('result', res);
      this.notes = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false)
          this.notes.push(res['data']['data'][i]);
      }
    }, error => {
      LoggerService.log(error);
    })
  }

}