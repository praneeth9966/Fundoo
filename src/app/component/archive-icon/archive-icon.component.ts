import { Component, OnInit, Input,EventEmitter,Output} from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.css']
})
export class ArchiveIconComponent implements OnInit {
  token=localStorage.getItem('token')
  constructor(private httpService:HttpService) { }
  @Input() archive;
  @Output() archiveNote=new EventEmitter
  @Output() unArchiveNote=new EventEmitter<boolean>()
  body;

  ngOnInit() {
  }

  archiveNotes(){ 
    this.body={
        "isArchived":true,
        "noteIdList":[this.archive.id]
    }
    this.httpService.httpPostArchive('notes/archiveNotes',this.body,this.token).subscribe(res => {
      console.log(res);
     this.archiveNote.emit();
    }, error => {
      console.log(error);
    })
  }

  unArchiveNotes(){ 
    this.body={
        "isArchived":false,
        "noteIdList":[this.archive.id]
    }
    this.httpService.httpPostArchive('notes/archiveNotes',this.body,this.token).subscribe(res => {
      console.log(res);
     this.unArchiveNote.emit(true);
    }, error => {
      console.log(error);
    })
  }
  
}
