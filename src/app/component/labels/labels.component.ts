import { Component, OnInit, ElementRef, ViewChild ,OnDestroy} from '@angular/core';
import { DataService } from '../../core/services/data/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})

export class LabelsComponent implements OnInit,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  notes: any[];

  private display;
  private labelId = localStorage.getItem('id');
  private id = localStorage.getItem('userId')
  private token = localStorage.getItem('token')

  constructor(private dataService: DataService, private dialog: MatDialog, private matSnackBar: MatSnackBar,private notesService:NotesService) { }

  @ViewChild('labels') labels: ElementRef;
  @ViewChild('newLabel') newLabel: ElementRef;

  ngOnInit() {
    this.notesService.getlabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.notes = [];
      this.notes = (res['data'].details);
      this.notes.sort(function(a, b){
        let nameA=a.label.toLowerCase(), nameB=b.label.toLowerCase()
        if (nameA < nameB) 
            return -1 
        if (nameA > nameB)
            return 1
        return 0 
    })
    })
  }

  /*   calling add Labels Api
   */
  addLabel() {
    if (!this.notes.some((data) => data.label == this.labels.nativeElement.innerHTML)) {
      this.notesService.postNoteLabels(
        {
          "label": this.labels.nativeElement.innerHTML,
          "isDeleted": false,
          "userId": this.id
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.matSnackBar.open("Label Added", 'Successfully', {
              duration: 3000,
            });
            
          })
    }
    
  }


  /*   calling delete Label Api
  */
  deleteLabel(id) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'trash' }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      if (data) {
        this.notesService.deletedata(id)
        .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.dataService.changeEvent(true);
            if (data) {
              this.getLabels();
            }
          })
      }
    });
  }


  /*   calling update label Api
   */
  updateLabel(id) {
    console.log( 'native',this.newLabel.nativeElement.innerHTML);
    
    this.notesService.postUpdateNotelabel(id,
      {
        "label": this.newLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id,
        "id": id
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
        })
  }

  update(id) {
    this.display = id
  }

  /*   calling get Labels Api
   */
  getLabels() {
    this.notesService.getlabels(
      
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.notes = [];
      for (let i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
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


