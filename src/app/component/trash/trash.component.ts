import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService:NotesService) { }
  private array = [];
  private body = {};
  private name = "trash";

  ngOnInit() {
    // this.notes=[];
    this.getNotes();
  }

  getNotes() {
    var token = localStorage.getItem('token');
    this.notesService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      LoggerService.log('result', res);
      this.array = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == true)
          this.array.push(res['data']['data'][i]);
      }
    }, error => {
      LoggerService.log(error);
    })
  }

  del(event) {
    if (event) {
      this.getNotes();
    }
  }

  restore(event) {
    if (event) {
      this.getNotes();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
