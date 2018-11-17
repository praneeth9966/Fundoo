import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})

export class LabelsComponent implements OnInit {
  notes: any[];

  public display;
  public labelId = localStorage.getItem('id');
  public id = localStorage.getItem('userId')
  public token = localStorage.getItem('token')

  constructor(private httpservice: HttpService, public dataService: DataService, public dialog: MatDialog, public matSnackBar: MatSnackBar) { }

  @ViewChild('labels') labels: ElementRef;
  @ViewChild('newLabel') newLabel: ElementRef;

  ngOnInit() {
    var token = localStorage.getItem('token');
    this.httpservice.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(res => {
      LoggerService.log('result', res);
      this.notes = [];
      this.notes = (res['data'].details);
    }, error => {
      LoggerService.log(error);
    })
  }

  /*   calling add Labels Api
   */
  addLabel() {
    LoggerService.log(this.id);
    if (!this.notes.some((data) => data.label == this.labels.nativeElement.innerHTML)) {
      this.httpservice.httpPostArchive('noteLabels',
        {
          "label": this.labels.nativeElement.innerHTML,
          "isDeleted": false,
          "userId": this.id
        }, this.token).subscribe(
          (data) => {
            LoggerService.log("POST Request is successful ", data);
            this.matSnackBar.open("Label Added", 'Successfully', {
              duration: 3000,
            });
            LoggerService.log('data', data);
          },
          error => {
            LoggerService.log("Error", error);
          })
    }
    else {
      LoggerService.log('label exists');
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
    dialogRef.afterClosed().subscribe(data => {
      LoggerService.log('The dialog was closed');
      if (data) {
        this.httpservice.httpDeleteLabel('noteLabels/' + id + '/deleteNoteLabel', localStorage.getItem('token'))
          .subscribe(data => {
            LoggerService.log('data', data);
            this.dataService.changeEvent(true);
            if (data) {
              this.getLabels();
            }
          }, error => {
            LoggerService.log(error);
          })
      }
    });
  }


  /*   calling update label Api
   */
  updateLabel(id) {
    LoggerService.log(this.id);
    this.httpservice.httpUpdateLabel('noteLabels/' + id + '/updateNoteLabel',
      {
        "label": this.newLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id,
        "id": id
      }
      , this.token).subscribe(
        (data) => {
          LoggerService.log("UPDATE Request is successful ", data);
          LoggerService.log('data', data);
        },
        error => {
          LoggerService.log("Error", error);
        })
  }

  update(id) {
    this.display = id
  }

  /*   calling get Labels Api
   */
  getLabels() {
    var token = localStorage.getItem('token');
    this.httpservice.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
      LoggerService.log('data', data);
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      LoggerService.log(error);
    })
  }

}


