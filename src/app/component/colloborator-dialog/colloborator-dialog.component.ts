import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { UsersService } from 'src/app/core/services/users/users.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
@Component({
  selector: 'app-colloborator-dialog',
  templateUrl: './colloborator-dialog.component.html',
  styleUrls: ['./colloborator-dialog.component.scss']
})
export class ColloboratorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ColloboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData, private dialog: MatDialog,
    private userService:UsersService,private notesService:NotesService) { }

  ngOnInit() {
  }

private searchNames;
private collaborator=[];

  cancel() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-padding-dialog',
      // position: { left: '450px' },
      data: this.data
    });

    dialogRef.afterClosed()
  }

  email = localStorage.getItem('email');
  firstName = localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastName');
  image = localStorage.getItem('imageUrl');
  profile = environment.profileUrl + this.image;

  myFunction(searchNames){
    LoggerService.log(this.searchNames);
      var body={
        "searchWord":this.searchNames
      }
      this.userService.searchCollaborator(body).subscribe(
        (data) => {
          this.collaborator=data['data']['details']
          LoggerService.log('data', this.collaborator);
          LoggerService.log('data', data);
        },
        error => {
          LoggerService.log("Error", error);
        })
  }

  addCollaborator(result){
    let body={
      "firstName":result.firstName,
      "lastName":result.lastName,
      "email":result.email,
      "userId":result.userId
    }
    this.notesService.addCollaboratorNotes(this.data.id,body).subscribe(
      (data) => {
        LoggerService.log('data', data);
      },
      error => {
        LoggerService.log("Error", error);
      })
  }

}

