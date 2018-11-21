import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-change-color-icon',
  templateUrl: './change-color-icon.component.html',
  styleUrls: ['./change-color-icon.component.scss']
})
export class ChangeColorIconComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService: NotesService) { }
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
    this.notesService.postchangecolor(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      LoggerService.log('result', res);
      this.noteColor.emit();
    }, error => {
      LoggerService.log(error);
    })
  }


  /*
  This method will be executed just before Angular destroys the components
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
