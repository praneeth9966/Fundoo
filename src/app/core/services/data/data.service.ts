import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private eventEmitter = new Subject<boolean>();
  currentEvent = this.eventEmitter.asObservable();

  private gridMessage = new Subject<boolean>();
  viewListObserver = this.gridMessage.asObservable();

  private profileSource = new BehaviorSubject(false);
  currentProfile = this.profileSource.asObservable();


  private label = new Subject<boolean>();
  currentlabel = this.label.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeEvent(message: boolean) {
    this.eventEmitter.next(message)
  }

  observerViewList(message: boolean) {
    this.gridMessage.next(message);
  }

  changeProfile(message: boolean) {
    this.profileSource.next(message);
  }

  changeLabel(message: boolean) {
    this.label.next(message);
  }

}