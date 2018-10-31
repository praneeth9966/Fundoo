import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.css']
})

export class MoreIconComponent implements OnInit {
  notes: any[];
  httpservice: any;
  public display: boolean = true;
  constructor(private httpService: HttpService) { }
  body;
  public labelBody = {};
  @Output() deleteNote = new EventEmitter();
  
  @Input() notesArray;

  ngOnInit() {
   
  }

  deleteNotes() {
    this.body = {
      "isDeleted": true,
      "noteIdList": [this.notesArray.id]
    }
    var token = localStorage.getItem('token');
    this.httpService.httpDeleteNotes('notes/trashNotes', this.body, token).subscribe(res => {
      console.log(res);
      this.deleteNote.emit();
    }, error => {
      console.log(error);
    })
  }

  addLabel(labelId) {
    this.labelBody = {
      "noteId": this.notesArray.id,
      "lableId": labelId
    }
    this.httpService.httpPostArchive('notes/' + this.notesArray.id + '/addLabelToNotes/' + labelId + '/add', this.labelBody, localStorage.getItem('token')).subscribe(result => {
      console.log(result);
      this.deleteNote.emit();
    }, error => {
      console.log(error);
    })
  }

  getLabels() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
      console.log(data);
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      console.log(error);
    })
  }

}
