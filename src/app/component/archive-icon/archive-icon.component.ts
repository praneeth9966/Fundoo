import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.scss']
})
export class ArchiveIconComponent implements OnInit {
  token = localStorage.getItem('token')
  constructor(private httpService: HttpService, public matSnackBar: MatSnackBar) { }
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
    this.httpService.httpPostArchive('notes/archiveNotes', this.body, this.token).subscribe(res => {
      LoggerService.log('result', res);
      this.matSnackBar.open("Archived", 'Successfully', {
        duration: 3000,
      });
      this.archiveNote.emit();
    }, error => {
      LoggerService.log(error);
    })
  }

  /*   calling post UnArchive Api
   */
  unArchiveNotes() {
    this.body = {
      "isArchived": false,
      "noteIdList": [this.archive.id]
    }
    this.httpService.httpPostArchive('notes/archiveNotes', this.body, this.token).subscribe(res => {
      this.matSnackBar.open("UnArchived", 'Successfully', {
        duration: 3000,
      });
      LoggerService.log('result', res);
      this.unArchiveNote.emit(true);
    }, error => {
      LoggerService.log(error);
    })
  }

}
