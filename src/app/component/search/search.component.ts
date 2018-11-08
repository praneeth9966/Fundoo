import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public httpService:HttpService,public dataService:DataService) { }
 
  searchBar;
  
  ngOnInit() {
this.dataService.currentMessage.subscribe(message=>{
  console.log(message);
  
  this.searchBar=message;
  console.log(this.searchBar,"searchComponent");
  
  this.displayNotes();
})


  }
  token=localStorage.getItem('token');
 
  notes = [];
  displayNotes() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      console.log(res);
      this.notes = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false)
          this.notes.push(res['data']['data'][i]);
      }
    }, error => {
      console.log(error);
    })
  }

}