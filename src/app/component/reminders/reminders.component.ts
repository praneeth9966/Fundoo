import { Component, OnInit ,OnDestroy} from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private getRemindersArray = [];
  private token = localStorage.getItem('token');

  constructor(private notesService:NotesService) { }

  ngOnInit() {
    this.getReminders();
  }


  /*   calling get reminders Api
   */
  getReminders() {
    this.notesService.getreminders()
    .pipe(takeUntil(this.destroy$))
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


  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
