import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notes } from '../../core/model/notes'
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService: NotesService) { }
  private notes: Notes[] = [];
  private notes1 = [];
  public fadingCircle:boolean=false;
  ngOnInit() {
    this.displayNotes();
    this.getPin();
  }


  /*   calling get notes Api
   */
  displayNotes() {
    this.notesService.getcard(

    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.fadingCircle=true
        this.notes = [];
        let newNotesArray: Notes[] = res['data']['data'];
        for (let i = newNotesArray.length - 1; i > 0; i--) {
          if (newNotesArray[i].isDeleted == false && newNotesArray[i].isArchived == false && newNotesArray[i].isPined == false)
            this.notes.push(newNotesArray[i]);

        }
      })
  }


  /*   calling get notes Api
   */
  getPin() {
    this.notesService.getcard()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.fadingCircle=true
        this.notes1 = [];
        let newNotesArray: Notes[] = res['data']['data'];
        for (let i = newNotesArray.length - 1; i > 0; i--) {
          if (newNotesArray[i].isDeleted == false && newNotesArray[i].isArchived == false && newNotesArray[i].isPined == true)
            this.notes1.push(newNotesArray[i]);
        }
      })
  }

  receiveMessage() {
    if (event) {
      this.displayNotes();
      this.getPin();
    }
  }

  newMessage(event: Notes) {
    this.notes.splice(0, 0, event);
  }

  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
