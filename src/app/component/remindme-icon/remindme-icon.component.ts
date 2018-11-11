import { Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-remindme-icon',
  templateUrl: './remindme-icon.component.html',
  styleUrls: ['./remindme-icon.component.scss']
})
export class RemindmeIconComponent implements OnInit {


  constructor(private httpService: HttpService) { }
  token = localStorage.getItem('token')
  @Input() reminders;
  @Output() addReminderEvent = new EventEmitter();
  body = {};
  show=true;
  datePickReminder(){
    this.show=!this.show;
  }
  backPressDatePicker(){
    this.show=true;
  }
  ngOnInit() {
  }

  getReminder() {
    this.httpService.httpGetReminder('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        console.log(data)
      })
    error => {
      console.log(error)
    }
  }

  todayReminder() {
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.reminders.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
      }
    this.httpService.httpAddReminder('/notes/addUpdateReminderNotes', this.body, this.token)
      .subscribe(data => {
        this.addReminderEvent.emit();
        console.log(data);
      },
        error => {
          console.log(error)
        })
  }
  tomorrowReminder() {
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.reminders.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
      }
    this.httpService.httpAddReminder('/notes/addUpdateReminderNotes', this.body, this.token)
      .subscribe(data => {
        this.addReminderEvent.emit();
        console.log(data);
      },
        error => {
          console.log(error)
        })
  }
  weekReminder() {
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.reminders.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
      }
    this.httpService.httpAddReminder('/notes/addUpdateReminderNotes', this.body, this.token)
      .subscribe(data => {
        this.addReminderEvent.emit();
        console.log(data);
      },
        error => {
          console.log(error)
        })
  }

}

