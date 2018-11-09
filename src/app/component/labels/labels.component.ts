import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})

export class LabelsComponent implements OnInit {
  notes: any[];

  display;
  labelId = localStorage.getItem('id');
  id = localStorage.getItem('userId')
  token = localStorage.getItem('token')

  constructor(private httpservice: HttpService, public dataService: DataService, public dialog: MatDialog) { }

  @ViewChild('labels') labels: ElementRef;
  @ViewChild('newLabel') newLabel: ElementRef;

  ngOnInit() {
    var token = localStorage.getItem('token');
    this.httpservice.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(res => {
      console.log(res);
      this.notes = [];
      this.notes = (res['data'].details);
    }, error => {
      console.log(error);
    })
  }

  addLabel() {
    console.log(this.id);

    if (!this.notes.some((data) => data.label == this.labels.nativeElement.innerHTML)) {
      this.httpservice.httpPostArchive('noteLabels',
        {
          "label": this.labels.nativeElement.innerHTML,
          "isDeleted": false,
          "userId": this.id
        }, this.token).subscribe(
          (data) => {
            console.log("POST Request is successful ", data);
            console.log(data);

          },
          error => {
            console.log("Error", error);
          })

    }

    else {
      console.log('label exists');

    }

  }


  deleteLabel(id) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'trash' }
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      if (data) {
        this.httpservice.httpDeleteLabel('noteLabels/' + id + '/deleteNoteLabel', localStorage.getItem('token'))
          .subscribe(data => {
            console.log(data);
            this.dataService.changeEvent(true);
            // alert("We’ll delete this label and remove it from all of your Keep notes. ")
            if (data) {
              this.getLabels();
            }
          }, error => {
            console.log(error);
          })
      }
    });
  }

  updateLabel(id) {
    console.log(this.id);
    this.httpservice.httpUpdateLabel('noteLabels/' + id + '/updateNoteLabel',
      {
        "label": this.newLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id,
        "id": id
      }
      , this.token).subscribe(
        (data) => {
          console.log("UPDATE Request is successful ", data);
          console.log(data);
        },
        error => {
          console.log("Error", error);
        })
  }

  update(id) {
    this.display = id
  }


  getLabels() {
    var token = localStorage.getItem('token');
    this.httpservice.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
      console.log(data);
      this.notes = [];
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      console.log(error);
    })
  }



}


