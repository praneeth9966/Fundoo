import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';
@Component({
  selector: 'app-change-label',
  templateUrl: './change-label.component.html',
  styleUrls: ['./change-label.component.css']
})
export class ChangeLabelComponent implements OnInit {
  notes = [];
  findLabel;
  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.findLabel = params.id;
      this.displayNotes();
    })
  }

  ngOnInit() {
    this.displayNotes();
  }
  displayNotes() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('notes/getNotesList', token).subscribe(res => {
      console.log(res);
      this.notes = [];
      for (var i = res['data']['data'].length - 1; i > 0; i--) {
        if (res['data']['data'][i].isDeleted == false && res['data']['data'][i].isArchived == false)

          for (let index = 0; index < res['data']['data'][i].noteLabels.length; index++) {
            if (res['data']['data'][i].noteLabels[index].label == this.findLabel) {
              this.notes.push(res['data']['data'][i]);
            }

          }
      }
    }, error => {
      console.log(error);
    })
  }
}
