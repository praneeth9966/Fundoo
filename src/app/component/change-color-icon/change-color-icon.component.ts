import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-change-color-icon',
  templateUrl: './change-color-icon.component.html',
  styleUrls: ['./change-color-icon.component.scss']
})
export class ChangeColorIconComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  @Input() notesArray;
  @Output() noteColor = new EventEmitter();
  @Output() ParentNoteColor = new EventEmitter<string>();
  private body;
  private colorArray = [[{ 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' }],

  [{ 'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' }],

  [{ 'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' }]]

  ngOnInit() {
  }

  /*   calling change colors Api
   */
  changeColor(paint) {
    this.ParentNoteColor.emit(paint);
    this.body = {
      "color": paint,
      "noteIdList": [this.notesArray]
    }
    var token = localStorage.getItem('token');
    this.httpService.httpDeleteNotes('notes/changesColorNotes', this.body, token).subscribe(res => {
      LoggerService.log('result', res);
      this.noteColor.emit();
    }, error => {
      LoggerService.log(error);
    })
  }

}
