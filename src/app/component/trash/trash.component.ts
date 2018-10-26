import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  constructor(private httpService:HttpService) { }
array=[];
  ngOnInit() {
    // this.notes=[];
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      console.log(res);
      
      for(var i=res['data']['data'].length-1;i>0;i--)
      {
        if(res['data']['data'][i].isDeleted==true)
        this.array.push(res['data']['data'][i]);
      }
      // this.notes = res['data']['data'].reverse();
    }, error => {
      console.log(error);
    })
  }

}
