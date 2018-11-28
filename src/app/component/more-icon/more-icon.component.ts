import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '../../component/delete-dialog/delete-dialog.component';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.scss']
})

export class MoreIconComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private notes: any[];
  public httpservice: any;
  public display: boolean = true;
  private model = {};
  private token = localStorage.getItem('token');
  private body;
  private labelBody = {};

  constructor(private dialog: MatDialog, private matSnackBar: MatSnackBar, private notesService: NotesService,
    public router:Router) { }
  @Output() deleteNote = new EventEmitter();
  @Output() addedLabel = new EventEmitter();
  @Output() trashEvent = new EventEmitter<boolean>();
  @Output() restoreEvent = new EventEmitter<boolean>();
  @Input() notesArray;
  @Input() name;

  ngOnInit() {

  }

  /*   calling delete notes Api
   */
  deleteNotes() {
    this.body = {
      "isDeleted": true,
      "noteIdList": [this.notesArray.id]
    }
    this.notesService.postTrashnotes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.matSnackBar.open("Notes deleted ", 'Successfully', {
          duration: 3000,
        });
        this.deleteNote.emit();
      })
  }


  /*   calling add Label Api
   */
  addLabel(labelId) {
    this.labelBody = {
      "noteId": this.notesArray.id,
      "lableId": labelId
    }
    this.notesService.postAddLabelnotes(this.notesArray.id, labelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.deleteNote.emit();
      })
  }


  /*   calling get Labels Api
   */
  getLabels() {
    this.notesService.getlabels()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.notes = [];
        for (let i = 0; i < data['data'].details.length; i++) {
          if (data['data'].details[i].isDeleted == false)
            this.notes.push(data['data'].details[i]);
        }
      })
  }


  /*   calling delete forever Api
   */
  deleteforever() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'trash' }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data) {
          this.model = {
            "isDeleted": true,
            "noteIdList": [this.notesArray.id]
          }
          this.notesService.postDeleteForeverNotes(this.model)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
              this.trashEvent.emit(true);
            })
        }
      });
  }


  /*   calling restore Api
   */
  restore() {
    this.body = {
      "isDeleted": false,
      "noteIdList": [this.notesArray.id]
    }
    this.notesService.postTrashnotes(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.matSnackBar.open("Notes restore", 'Successfully', {
          duration: 3000,
        });
        this.restoreEvent.emit(true);
      })
  }

  askAQuestion(){
    this.router.navigate(['homepage/notes/'+this.notesArray.id+'/questions'])
  }
  /*
 This method will be executed just before Angular destroys the components
 */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
