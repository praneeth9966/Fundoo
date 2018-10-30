import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  notes: any[];
  display;
  labelId = localStorage.getItem('id');
  constructor(private httpservice: HttpService) { }

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

  id = localStorage.getItem('userId')
  token = localStorage.getItem('token')
 
  addLabel() {
    console.log(this.id);
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

  deleteLabel(id) {
    this.httpservice.httpDeleteLabel('noteLabels/' + id + '/deleteNoteLabel', localStorage.getItem('token')).subscribe(data => {
      console.log(data);
      for (var i = 0; i < data['data'].details.length; i++) {
        if (data['data'].details[i].isDeleted == false)
          this.notes.push(data['data'].details[i]);
      }
    }, error => {
      console.log(error);
    })
  }

  // updateLabel(id) {
   
  //   console.log(this.id);
  //   this.httpservice.httpUpdateLabel('noteLabels/'+ id +'/updateNoteLabel',
  //     {
  //       "label":this.labels,
  //       "isDeleted": false,
  //       "userId": this.id
  //     }, this.token).subscribe(
  //       (data) => {
  //         console.log(data);

  //       },
  //       error => {
  //         console.log("Error", error);
  //       })
  // }

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
          // this.temp2 = data['data']['details'];

          console.log(data);

        },
        error => {
          console.log("Error", error);
        })

  }

update(id){
  this.display=id
}
 
  
}


