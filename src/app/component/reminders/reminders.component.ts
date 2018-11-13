import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  getRemindersArray = [];
  token = localStorage.getItem('token');

  constructor(public httpService: HttpService) { }


  ngOnInit() {
    this.getReminders();
  }

  getReminders() {
    this.httpService.httpGetReminder('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        this.getRemindersArray = data['data']['data'];
      })
    error => {
      console.log(error)
    }
  }

}
