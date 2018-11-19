import { Component, OnInit } from '@angular/core';
import { MessagingService } from './core/services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'fundoo';
  message;
  constructor(private messageService:MessagingService){}

  ngOnInit(){
    this.messageService.getPermission();
    this.messageService.receiveMessage();
  }
}


