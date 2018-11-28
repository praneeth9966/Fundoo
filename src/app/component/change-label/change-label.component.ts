/************************************************************************************************
*  Execution       :   1. default node         cmd> change-label.ts 
*        
*  Purpose         : when u click on particular label it will redirect to that label state
* 
*  Description    
* 
*  @file           : change-label.ts
*  @overview       : when u click on particular label it will redirect to that label state
*  @module         : change-label.ts - This is optional if expeclictly its an npm or local package
*  @author         : Praneeth Kunapareddy <kunapareddypraneeth47@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Notes } from 'src/app/core/model/notes';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-change-label',
  templateUrl: './change-label.component.html',
  styleUrls: ['./change-label.component.scss']
})
export class ChangeLabelComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private notes: Notes[] = [];
  private findLabel;

  constructor(private route: ActivatedRoute, private notesService: NotesService) {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.findLabel = params.id;
        this.displayNotes();
      })
  }

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized 
   * all data-bound properties of a directive. */
  ngOnInit() {
    this.displayNotes();
  }

  /*
    calling getNotes Api
  */
  displayNotes() {
    this.notesService.getcard()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.notes = [];
        let newNotesArray: Notes[] = res['data']['data'];

        for (let i = newNotesArray.length - 1; i > 0; i--) {
          if (newNotesArray[i].isDeleted == false && newNotesArray[i].isArchived == false)
            for (let index = 0; index < res['data']['data'][i].noteLabels.length; index++) {
              if (newNotesArray[i].noteLabels[index].label == this.findLabel) {
                this.notes.push(newNotesArray[i]);
              }
            }
        }
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