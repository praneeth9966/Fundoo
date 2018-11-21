import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private pinBody = {};

  @Input() isPinedArray
  @Output() pinEvent = new EventEmitter()

  constructor(private notesService:NotesService) { }

  ngOnInit() {
  }

  /*   calling pin notes Api
   */
  pin() {
    this.pinBody = {
      "noteIdList": [this.isPinedArray.id],
      "isPined": true,
    }
    this.notesService.postPinUnpin(this.pinBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      LoggerService.log('result', result);
      this.pinEvent.emit({
      });
    }, error => {
      LoggerService.log(error);
    })
  }


  /*   calling Unpin Notes Api
   */
  unPin() {
    this.pinBody = {
      "noteIdList": [this.isPinedArray.id],
      "isPined": false,
    }
    this.notesService.postPinUnpin(this.pinBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      LoggerService.log('result', result);
      this.pinEvent.emit({
      });
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
