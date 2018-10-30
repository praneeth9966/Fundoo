import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-change-color-icon',
  templateUrl: './change-color-icon.component.html',
  styleUrls: ['./change-color-icon.component.css']
})
export class ChangeColorIconComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  @Input() notesArray;
  @Output() noteColor = new EventEmitter();
  @Output() ParentNoteColor = new EventEmitter<string>();
  body;

  ngOnInit() {
  }

  changeColor(paint) {
    this.ParentNoteColor.emit(paint);
    this.body = {
      "color": paint,
      "noteIdList": [this.notesArray]
    }
    var token = localStorage.getItem('token');
    this.httpService.httpDeleteNotes('notes/changesColorNotes', this.body, token).subscribe(res => {
      console.log(res);
      this.noteColor.emit();

    }, error => {
      console.log(error);
    })
  }

}
