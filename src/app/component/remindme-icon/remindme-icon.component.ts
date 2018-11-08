import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-remindme-icon',
  templateUrl: './remindme-icon.component.html',
  styleUrls: ['./remindme-icon.component.css']
})
export class RemindmeIconComponent implements OnInit {


  constructor(private httpService: HttpService) { }
  token = localStorage.getItem('token')
  @Input() reminders;
  body = {};
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
        console.log(data);
      },
        error => {
          console.log(error)
        })
  }

}

