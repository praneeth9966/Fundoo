import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeleteDialogComponent } from '../../component/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.css']
})

export class MoreIconComponent implements OnInit {
  notes: any[];
  httpservice: any;
  public display: boolean = true;
  model={};
  token=localStorage.getItem('token');
  constructor(private httpService: HttpService,public dialog:MatDialog) { }
  body;
  public labelBody = {};
  @Output() deleteNote = new EventEmitter();
  @Output() addedLabel = new EventEmitter();
  
  
  @Input() notesArray;
  @Input() name;
  ngOnInit() {
   
  }

  deleteNotes() {
    this.body = {
      "isDeleted": true,
      "noteIdList": [this.notesArray.id]
    }
    var token = localStorage.getItem('token');
    this.httpService.httpDeleteNotes('notes/trashNotes', this.body, token).subscribe(res => {
      console.log(res);
      this.deleteNote.emit();
    }, error => {
      console.log(error);
    })
  }

  addLabel(labelId) {
    console.log(this.notesArray,"notess");
    
    console.log(this.notesArray.id);
    
    this.labelBody = {
      "noteId": this.notesArray.id,
      "lableId": labelId
    }
    this.httpService.httpPostArchive('notes/' + this.notesArray.id + '/addLabelToNotes/' + labelId + '/add', this.labelBody, localStorage.getItem('token')).subscribe(result => {
      console.log(result);
      this.deleteNote.emit();
      this.addedLabel.emit();
    }, error => {
      console.log(error);
    })
  }

  getLabels() {
    var token = localStorage.getItem('token');
    this.httpService.httpGetNotes('noteLabels/getNoteLabelList', token).subscribe(data => {
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

  deleteforever(){
    const dialogRef=this.dialog.open(DeleteDialogComponent,{
      width:'500px',
      panelClass:'myapp-no-paddding-dialog',
      data:{name:'trash'}
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      if(data){
        this.model={
          "isDeleted":true,
          "noteIdList":[this.notesArray.id]
        }
        this.httpService.httpPostArchive('notes/deleteForeverNotes',this.model,this.token).subscribe(data=>{
         console.log(data);
         
          this.deleteNote.emit();
         
        }, error => {
          console.log(error);
        })

      }
    });
  }
}
