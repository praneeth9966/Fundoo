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


   /*   calling get reminders Api
    */
  getReminders() {
    this.httpService.httpGetReminder('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        this.getRemindersArray = data['data']['data'];
        this.getRemindersArray.sort(this.compare);
      })
    error => {
      console.log(error)
    }
  }

  compare(a,b) {
    a = new Date(a.reminder);
    b = new Date(b.reminder);
    if (a < b)
      return -1;
    if (a > b)
      return 1;
    return 0;
  }

  refreshREminders(event){
    if(event){
      this.getReminders();
    }

  }

}
