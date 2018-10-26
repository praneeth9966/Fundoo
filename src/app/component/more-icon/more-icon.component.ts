import { Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.css']
})
export class MoreIconComponent implements OnInit {

  constructor(private httpService:HttpService) { }
body;
  @Output() deleteNote = new EventEmitter();
  @Input() notesArray;
  

  ngOnInit() {
  }

  deleteNotes() {
    this.body={
      "isDeleted":true,
      "noteIdList":[this.notesArray.id]
      }
    var token = localStorage.getItem('token');
    this.httpService.httpDeleteNotes('notes/trashNotes',this.body,token).subscribe(res => {
      console.log(res);
     this.deleteNote.emit();
    }, error => {
      console.log(error);
    })
  }
}
