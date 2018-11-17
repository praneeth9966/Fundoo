import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
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
      console.log('Notification permission granted.');
      return this.messaging.getToken()
    })
    .then(pushToken => {
      localStorage.setItem('pushToken',pushToken);
      console.log('pushToken in service',pushToken);
      
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
     this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
     
    });

  }
}
