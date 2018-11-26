import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private pinBody = {};

  @Input() isPinedArray
  @Output() pinEvent = new EventEmitter()

  constructor(private notesService: NotesService) { }

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
        this.pinEvent.emit({
        });
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
        this.pinEvent.emit({
        });
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
