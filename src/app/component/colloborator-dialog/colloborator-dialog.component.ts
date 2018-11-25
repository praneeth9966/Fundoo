import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
@Component({
  selector: 'app-colloborator-dialog',
  templateUrl: './colloborator-dialog.component.html',
  styleUrls: ['./colloborator-dialog.component.scss']
})
export class ColloboratorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ColloboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData, private dialog: MatDialog,
    private userService: UsersService, private notesService: NotesService) { }

  ngOnInit() {
    for (let i = 0; i < this.data['collaborators'].length; i++) {
      this.friendsNewList.push(this.data['collaborators'][i]);
    }
  }

  private searchNames;
  private collaborator = [];
  private friendsNewList = [];

  cancel() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-padding-dialog',
      data: this.data
    });
    dialogRef.afterClosed()
  }

  email = localStorage.getItem('email');
  firstName = localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastName');
  image = localStorage.getItem('imageUrl');
  profile = environment.profileUrl + this.image;

  myFunction(searchNames) {
    let body = {
      "searchWord": this.searchNames
    }
    this.userService.searchCollaborator(body).subscribe(
      (data) => {
        this.collaborator = data['data']['details']
      })
  }

  addCollaborator(result) {
    let body = {
      "firstName": result.firstName,
      "lastName": result.lastName,
      "email": result.email,
      "userId": result.userId
    }
    this.notesService.addCollaboratorNotes(this.data.id, body).subscribe(
      (data) => {
      })
  }

  select(personEmail) {
    this.searchNames = personEmail;
  }

  enterNames(searchPerson) {
    for (let index = 0; index < this.collaborator.length; index++) {
      if (this.collaborator[index].email == searchPerson) {
        this.friendsNewList.push(this.collaborator[index]);
      }
    }
    this.searchNames = [];
  }

  removeCollaborator(item) {
    this.notesService.removeCollaborator(this.data.id, item.userId).subscribe(
      (data) => {
      })
  }

}