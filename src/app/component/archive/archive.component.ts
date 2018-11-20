import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private array = [];
  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.myFunc();
  }

  /*   calling get archive Api
    */
  myFunc() {
    var token = localStorage.getItem('token');
    this.notesService.getarchive()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      LoggerService.log('result', res);
      this.array = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        this.array.push(res['data']['data'][i]);
      }
    }, error => {
      LoggerService.log(error);
    })
  }

  /*   UnArchive event emitter function
    */
  get(event) {
    if (event) {
      this.myFunc();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
