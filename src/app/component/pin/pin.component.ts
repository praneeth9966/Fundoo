import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  pinBody = {};
  @Input() isPinedArray
  @Output() pinEvent = new EventEmitter()
  constructor(public httpService: HttpService) { }

  ngOnInit() {
  }


   /*   calling pin notes Api
    */
  pin() {
    this.pinBody = {
      "noteIdList": [this.isPinedArray.id],
      "isPined": true,
    }
    this.httpService.httpDeleteNotes('notes/pinUnpinNotes', this.pinBody, localStorage.getItem('token')).subscribe(result => {
      LoggerService.log('result', result);
      this.pinEvent.emit({
      });
    }, error => {
      console.log(error);
    })
  }


   /*   calling Unpin Notes Api
    */
  unPin() {
    this.pinBody = {
      "noteIdList": [this.isPinedArray.id],
      "isPined": false,
    }
    this.httpService.httpDeleteNotes('notes/pinUnpinNotes', this.pinBody, localStorage.getItem('token')).subscribe(result => {
      LoggerService.log('result', result);
      this.pinEvent.emit({
      });
    }, error => {
      console.log(error);
    })
  }
}
