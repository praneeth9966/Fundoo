import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-remindme-icon',
  templateUrl: './remindme-icon.component.html',
  styleUrls: ['./remindme-icon.component.scss']
})
export class RemindmeIconComponent implements OnInit {

  @Input() noteDetails;
  @Output() addReminderEvent = new EventEmitter();
  @Output() notesCreateReminderEvent = new EventEmitter();
  // currentDate:any;
  date: Date = new Date();
  customDate = this.date;

  reminderArrayEvent: any;
  customTime: any;
  editReminderEventClicked: any;
public data;
  constructor(private httpService: HttpService,
  ) { }
  public message;
  ngOnInit() {

  }

  body = {};
  public currentDate = new Date();
  reminders: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM' },
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM' }];

  todayReminder() {
  this.data=new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 8, 0, 0, 0)
this.notesCreateReminderEvent.emit(this.data);
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 8, 0, 0, 0)
    }
    this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

      this.addReminderEvent.emit()
    })
  }

  tomorrowReminder() {
this.data= new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 1), 8, 0, 0, 0)
this.notesCreateReminderEvent.emit(this.data);
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 1), 8, 0, 0, 0)
    }
    this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

      this.addReminderEvent.emit()
    })
  }

  weekReminder() {
this.data=new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 7), 8, 0, 0, 0)
this.notesCreateReminderEvent.emit(this.data);
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 7), 8, 0, 0, 0)
    }
    this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

      this.addReminderEvent.emit()
    })
  }

  show = true
  datePickReminder() {
    this.show = !this.show;
  }
  backPressDatepicker() {
    this.show = true;
  }
  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }

  addRemCustom(date, timing) {
this.data=new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
this.notesCreateReminderEvent.emit(this.data);
    timing.match('^[0-2][0-3]:[0-5][0-9]$');

    if (timing == '8:00 AM') {
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
      }
      this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

        this.addReminderEvent.emit()
      })
    } else if (timing == '1:00 PM') {
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
      }
      this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

        this.addReminderEvent.emit()
      })
    } else if (timing == '6:00 PM') {
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
      }
      this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

        this.addReminderEvent.emit()
      })
    } else if (timing == '9:00 PM') {
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
      }
      this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

        this.addReminderEvent.emit()
      })
    } else if (timing == this.reminderBody.time) {
      var x;
      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);

      if (ampm == 'AM' || ampm == 'am') {
        this.body = {
          "noteIdList": [this.noteDetails.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
        }
        this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

          this.addReminderEvent.emit()
        })
      } else if (ampm == 'PM' || ampm == 'pm') {
        this.body = {
          "noteIdList": [this.noteDetails.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12, minute, 0, 0)
        }
        this.httpService.httpAddReminder('notes/addUpdateReminderNotes', this.body, localStorage.getItem('token')).subscribe((result) => {

          this.addReminderEvent.emit()
        })
      }

    }
  }

  

}
