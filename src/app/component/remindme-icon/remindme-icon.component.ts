import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenu } from '@angular/material';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-remindme-icon',
  templateUrl: './remindme-icon.component.html',
  styleUrls: ['./remindme-icon.component.scss'],
  exportAs: 'menuInOtherComponent',
})
export class RemindmeIconComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() noteDetails;
  @Output() addReminderEvent = new EventEmitter();
  @Output() notesCreateReminderEvent = new EventEmitter();

  private date: Date = new Date();
  private customDate = this.date;
  private reminderArrayEvent: any;
  private customTime: any;
  private editReminderEventClicked: any;
  private data;
  private message;
  private body = {};
  private currentDate = new Date();
  private reminders: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM' },
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM' }];
  private show = true;
  private reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }

  @ViewChild(MatMenu) menu: MatMenu;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
  }

  todayReminder() {
    this.data = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 20, 0, 0, 0)
    this.notesCreateReminderEvent.emit(this.data);
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 20, 0, 0, 0)
    }
    this.notesService.postAddUpdateReminderNOtes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.addReminderEvent.emit()
      })
  }

  tomorrowReminder() {
    this.data = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 1), 8, 0, 0, 0)
    this.notesCreateReminderEvent.emit(this.data);
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 1), 8, 0, 0, 0)
    }
    this.notesService.postAddUpdateReminderNOtes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.addReminderEvent.emit()
      })
  }

  weekReminder() {
    this.data = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 7), 8, 0, 0, 0)
    this.notesCreateReminderEvent.emit(this.data);
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 7), 8, 0, 0, 0)
    }
    this.notesService.postAddUpdateReminderNOtes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.addReminderEvent.emit()
      })
  }


  datePickReminder() {
    this.show = !this.show;
  }

  backPressDatepicker() {
    this.show = true;
  }



  addRemCustom(date, timing) {
    timing.match('^[0-2][0-3]:[0-5][0-9]$');
    if (timing == '8:00 AM') {
      let reminder1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
      this.notesCreateReminderEvent.emit(reminder1);
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": reminder1
      }
      this.notesService.postAddUpdateReminderNOtes(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.addReminderEvent.emit()
        })
    } else if (timing == '1:00 PM') {
      let reminder2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
      this.notesCreateReminderEvent.emit(reminder2);
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": reminder2
      }
      this.notesService.postAddUpdateReminderNOtes(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.addReminderEvent.emit()
        })
    } else if (timing == '6:00 PM') {
      let reminder3 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
      this.notesCreateReminderEvent.emit(reminder3);
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": reminder3
      }
      this.notesService.postAddUpdateReminderNOtes(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.addReminderEvent.emit()
        })
    } else if (timing == '9:00 PM') {
      let reminder4 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
      this.notesCreateReminderEvent.emit(reminder4);
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": reminder4
      }
      this.notesService.postAddUpdateReminderNOtes(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.addReminderEvent.emit()
        })
    } else if (timing == this.reminderBody.time) {
      let splitTime = this.reminderBody.time.split("", 8);
      let hour = Number(splitTime[0] + splitTime[1]);
      let minute = Number(splitTime[3] + splitTime[4]);
      let ampm = (splitTime[6] + splitTime[7]);
      if (ampm == 'AM' || ampm == 'am') {
        let reminder6 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
        this.notesCreateReminderEvent.emit(reminder6);
        this.body = {
          "noteIdList": [this.noteDetails.id],
          "reminder": reminder6
        }
        this.notesService.postAddUpdateReminderNOtes(this.body)
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            this.addReminderEvent.emit()
          })
      } else if (ampm == 'PM' || ampm == 'pm') {
        let reminder7 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12, minute, 0, 0)
        this.notesCreateReminderEvent.emit(reminder7);
        this.body = {
          "noteIdList": [this.noteDetails.id],
          "reminder": reminder7
        }
        this.notesService.postAddUpdateReminderNOtes(this.body)
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            this.addReminderEvent.emit()
          })
      }

    }
  }

  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
