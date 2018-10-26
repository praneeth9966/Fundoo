import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {
  notes = [];
  interval;
  constructor(private httpService: HttpService) { }
  @Output() notifyParent = new EventEmitter();
  @Output() noteParent = new EventEmitter();
  // @Output() archiveParent = new EventEmitter();

  @Input() array;
  ngOnInit() {

  }
  getNotification(event){
    this.notifyParent.emit({

    });
  }
  messageColor($event){
    this.noteParent.emit();
 
 
  }
  // archive(event){
  //   this. archiveParent.emit();
  // }
}
