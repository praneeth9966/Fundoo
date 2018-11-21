import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { Label, Notes } from 'src/app/core/model/notes';
@Component({
  selector: 'app-change-label',
  templateUrl: './change-label.component.html',
  styleUrls: ['./change-label.component.scss']
})
export class ChangeLabelComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private notes:Notes[] = [];
  private findLabel;

  constructor(private route: ActivatedRoute,private notesService: NotesService) {
    this.route.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      LoggerService.log('params', params);
      this.findLabel = params.id;
      this.displayNotes();
    })
  }

  ngOnInit() {
    this.displayNotes();
  }

  /*
    calling getNotes Api
  */
  displayNotes() {
    var token = localStorage.getItem('token');
    this.notesService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      LoggerService.log('result', res);
      this.notes = [];
      var newNotesArray:Notes[]=res['data']['data'];

      for (var i = newNotesArray.length - 1; i > 0; i--) {
        if (newNotesArray[i].isDeleted == false && newNotesArray[i].isArchived == false)
          for (let index = 0; index < res['data']['data'][i].noteLabels.length; index++) {
            if (newNotesArray[i].noteLabels[index].label == this.findLabel) {
              this.notes.push(newNotesArray[i]);
            }
          }
      }
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