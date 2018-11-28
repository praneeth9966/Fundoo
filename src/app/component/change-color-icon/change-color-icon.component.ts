/************************************************************************************************
*  Execution       :   1. default node         cmd> change-color-icon.ts 
*        
*  Purpose         : when you click change-color-icon particular card color should be changed 
* 
*  Description    
* 
*  @file           : change-color-icon.ts
*  @overview       : when you click change-color-icon particular card color should be changed
*  @module         : change-color-icon.ts - This is optional if expeclictly its an npm or local package
*  @author         : Praneeth Kunapareddy <kunapareddypraneeth47@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-change-color-icon',
  templateUrl: './change-color-icon.component.html',
  styleUrls: ['./change-color-icon.component.scss']
})
export class ChangeColorIconComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService: NotesService) { }

  /**Input and Output are two decorators in Angular responsible for communication between
   *  two components*/
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

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized 
   * all data-bound properties of a directive. */
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
    this.notesService.postchangecolor(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.noteColor.emit();
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
