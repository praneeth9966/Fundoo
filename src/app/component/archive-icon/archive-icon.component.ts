import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.scss']
})
export class ArchiveIconComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  token = localStorage.getItem('token')
  constructor(public matSnackBar: MatSnackBar, private notesService: NotesService) { }
  @Input() archive;
  @Output() archiveNote = new EventEmitter
  @Output() unArchiveNote = new EventEmitter<boolean>()
  public body;

  ngOnInit() {
  }

  /*   calling post archive Api
   */
  archiveNotes() {
    this.body = {
      "isArchived": true,
      "noteIdList": [this.archive.id]
    }
    this.notesService.postArchivenotes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.matSnackBar.open("Archived", 'Successfully', {
          duration: 3000,
        });
        this.archiveNote.emit();
      })
  }

  /*   calling post UnArchive Api
   */
  unArchiveNotes() {
    this.body = {
      "isArchived": false,
      "noteIdList": [this.archive.id]
    }
    this.notesService.postArchivenotes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.matSnackBar.open("UnArchived", 'Successfully', {
          duration: 3000,
        });
        this.unArchiveNote.emit(true);
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
