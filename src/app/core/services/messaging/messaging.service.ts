import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { LoggerService } from '../logger/logger.service';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {


  messaging;

  constructor() { 
    firebase.initializeApp({
      'messagingSenderId': '263147610417'
    });
    
    this.messaging = firebase.messaging();
  }

  getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      LoggerService.log('Notification permission granted.');
      return this.messaging.getToken()
    })
    .then(pushToken => {
      localStorage.setItem('pushToken',pushToken);
      LoggerService.log('pushToken in service',pushToken);
      
    })
    .catch((err) => {
      LoggerService.log('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
     this.messaging.onMessage((payload) => {
      LoggerService.log("Message received. ", payload);
     
    });

  }
}
