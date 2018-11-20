import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-change-label',
  templateUrl: './change-label.component.html',
  styleUrls: ['./change-label.component.scss']
})
export class ChangeLabelComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private notes = [];
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
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false)
          for (let index = 0; index < res['data']['data'][i].noteLabels.length; index++) {
            if (res['data']['data'][i].noteLabels[index].label == this.findLabel) {
              this.notes.push(res['data']['data'][i]);
            }
          }
      }
    }, error => {
      LoggerService.log(error);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}