import { Component, OnInit,OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/data/data.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService,private notesService:NotesService) { }

  private searchBar;
  private token = localStorage.getItem('token');
  private notes = [];

  ngOnInit() {
    this.dataService.currentMessage
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.searchBar = message;
      this.displayNotes();
    })
  }

  displayNotes() {
    this.notesService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.notes = [];
      for (let i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false)
          this.notes.push(res['data']['data'][i]);
      }
    })
  }


  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}