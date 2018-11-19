import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  private getRemindersArray = [];
  private token = localStorage.getItem('token');

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getReminders();
  }


  /*   calling get reminders Api
   */
  getReminders() {
    this.httpService.httpGetReminder('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        this.getRemindersArray = data['data']['data'];
        this.getRemindersArray.sort(this.compare);
      })
    error => {
      LoggerService.log(error)
    }
  }

  /*   function for sorting reminders
   */
  compare(a, b) {
    a = new Date(a.reminder);
    b = new Date(b.reminder);
    if (a < b)
      return -1;
    if (a > b)
      return 1;
    return 0;
  }

  refreshREminders(event) {
    if (event) {
      this.getReminders();
    }
  }

}
