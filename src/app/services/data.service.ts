import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private eventEmitter = new Subject<boolean>();
  currentEvent = this.eventEmitter.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  changeEvent(message: boolean) {
    this.eventEmitter.next(message)
  }

}