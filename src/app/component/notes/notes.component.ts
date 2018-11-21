import { Component, OnInit ,OnDestroy} from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import {Notes} from '../../core/model/notes'
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService:NotesService) { }
  private notes:Notes[] = [];
  private notes1 = [];

  ngOnInit() {
    this.displayNotes();
    this.getPin();
  }


  /*   calling get notes Api
   */
  displayNotes() {
    var token = localStorage.getItem('token');
    this.notesService.getcard(

    )
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
     
      this.notes = [];
      var newNotesArray:Notes[]=res['data']['data'];
      for (var i = newNotesArray.length - 1; i > 0; i--) {
        if (newNotesArray[i].isDeleted == false && newNotesArray[i].isArchived == false && newNotesArray[i].isPined == false)
          this.notes.push(newNotesArray[i]);
          
      }
    }, error => {
      LoggerService.log(error);
    })
  }


  /*   calling get notes Api
   */
  getPin() {
    var token = localStorage.getItem('token');
    this.notesService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.notes1 = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false && res['data']['data'][i].isPined == true)
          this.notes1.push(res['data']['data'][i]);
      }
    }, error => {
      LoggerService.log(error);
    })
  }

  receiveMessage() {
    if (event) {
      this.displayNotes();
      this.getPin();
    }
  }

  newMessage(event:Notes) {
    this.notes.splice(0,0,event);
  }

  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
