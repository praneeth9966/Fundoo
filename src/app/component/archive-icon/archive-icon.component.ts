/************************************************************************************************
*  Execution       :   1. default node         cmd> archive-icon.ts 
*        
*  Purpose         : when you click archive-icon particular card will go to archived component 
* 
*  Description    
* 
*  @file           : archive-icon.ts
*  @overview       : when you click archive-icon particular card will go to archived component
*  @module         : archive-icon.ts - This is optional if expeclictly its an npm or local package
*  @author         : Praneeth Kunapareddy <kunapareddypraneeth47@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.scss']
})
export class ArchiveIconComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  token = localStorage.getItem('token')
  constructor(public matSnackBar: MatSnackBar, private notesService: NotesService) { }

  /**Input and Output are two decorators in Angular responsible for communication between
   *  two components*/
  @Input() archive;
  @Output() archiveNote = new EventEmitter
  @Output() unArchiveNote = new EventEmitter<boolean>()
  public body;

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized 
   * all data-bound properties of a directive. */
  ngOnInit() {
  }

  /*   calling post archive Api
   */
  archiveNotes() {
    this.body = {
      "isArchived": true,
      "noteIdList": [this.archive.id]
    }
    this.notesService.postArchivenotes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.matSnackBar.open("Archived", 'Successfully', {
          duration: 3000,
        });
        this.archiveNote.emit();
      })
  }

  /*   calling post UnArchive Api
   */
  unArchiveNotes() {
    this.body = {
      "isArchived": false,
      "noteIdList": [this.archive.id]
    }
    this.notesService.postArchivenotes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.matSnackBar.open("UnArchived", 'Successfully', {
          duration: 3000,
        });
        this.unArchiveNote.emit(true);
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
