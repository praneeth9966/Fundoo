/************************************************************************************************
*  Execution       :   1. default node         cmd> collaborator-dialog.ts 
*        
*  Purpose         : In collaborator dialog you share the cards to others
* 
*  Description    
* 
*  @file           : collaborator-dialog.ts
*  @overview       : In collaborator dialog you share the cards to others
*  @module         : collaborator-dialog.ts - This is optional if expeclictly its an npm or local package
*  @author         : Praneeth Kunapareddy <kunapareddypraneeth47@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-colloborator-dialog',
  templateUrl: './colloborator-dialog.component.html',
  styleUrls: ['./colloborator-dialog.component.scss']
})
export class ColloboratorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ColloboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData, private dialog: MatDialog,
    private userService: UsersService, private notesService: NotesService, private snackBar: MatSnackBar) { }

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized 
   * all data-bound properties of a directive. */
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
      maxWidth:'auto',
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
  owner=this.data["user"];
  ownerProfile = environment.profileUrl + this.owner.imageUrl;
  myFunction(event) {

    let body = {
      "searchWord": this.searchNames
    }
    this.userService.searchCollaborator(body).subscribe(
      (data) => {
        this.collaborator = data['data']['details'];
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
        this.data['collaborators'].push(result)
      })
  }

  select(personEmail) {
    this.searchNames = personEmail;
  }

  enterNames(searchPerson) {
    for (let j = 0; j < this.friendsNewList.length; j++) {
      if (this.searchNames == this.friendsNewList[j].email) {
        this.snackBar.open("Collaborator already exists", "fail", {
          duration: 3000
        })
        this.searchNames = null;
        return false;
      }
    }
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

        for (var i = 0; i < this.friendsNewList.length; i++) {
          if (this.friendsNewList[i].userId == item.userId) {
            this.friendsNewList.splice(i, 1);
            this.data['collaborators'].splice(i, 1);

          }
        }
      })
  }


}