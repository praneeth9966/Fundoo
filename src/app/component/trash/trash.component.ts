import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  array = [];
  body={};

  public name = "trash";
  
  ngOnInit() {
    // this.notes=[];
    this.getNotes();
  }

  getNotes() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      console.log(res);
      this.array = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == true)
          this.array.push(res['data']['data'][i]);
      }
    }, error => {
      console.log(error);
    })
  }
  
  del(event) { 
    if(event){
    this.getNotes();
    }
  }

  restore(event){
  if(event){
    this.getNotes();
  }
  }

}
