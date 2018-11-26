import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService: NotesService) { }
  private array = [];
  private body = {};
  private name = "trash";

  ngOnInit() {
    // this.notes=[];
    this.getNotes();
  }

  getNotes() {
    this.notesService.getcard()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.array = [];
        for (let i = res['data']['data'].length - 1; i > 0; i--) {
          if (res['data']['data'][i].isDeleted == true)
            this.array.push(res['data']['data'][i]);
        }
      })
  }

  del(event) {
    if (event) {
      this.getNotes();
    }
  }

  // restore(event) {
  //   if (event) {
  //     this.getNotes();
  //   }
  // }


  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
