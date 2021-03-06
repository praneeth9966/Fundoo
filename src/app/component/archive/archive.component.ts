/************************************************************************************************
*  Execution       :   1. default node         cmd> archive.ts 
*        
*  Purpose         : To display archived cards when clicked 
* 
*  Description    
* 
*  @file           : archive.ts
*  @overview       : To display archived cards when clicked
*  @module         : archive.ts - This is optional if expeclictly its an npm or local package
*  @author         : Praneeth Kunapareddy <kunapareddypraneeth47@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private array = [];
  public fadingCircle:boolean=false;
  constructor(private notesService: NotesService) { }

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized 
   * all data-bound properties of a directive. */
  ngOnInit() {
    this.myFunc();
  }

  /*   calling get archive Api
    */
  myFunc() {
    this.notesService.getarchive()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.fadingCircle=true;
        this.array = [];
        for (let i = res['data']['data'].length - 1; i > 0; i--) {
          this.array.push(res['data']['data'][i]);
        }
      })
  }

  /*   UnArchive event emitter function
    */
  get(event) {
    if (event) {
      this.myFunc();
    }
  }

  /*
  This method will be executed just before Angular destroys the components
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
