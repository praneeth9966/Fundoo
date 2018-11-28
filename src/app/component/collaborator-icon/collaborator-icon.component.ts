/************************************************************************************************
*  Execution       :   1. default node         cmd> collaborator-icon.ts 
*        
*  Purpose         : when u click on collaborator icon dialog will open
* 
*  Description    
* 
*  @file           : collaborator-icon.ts
*  @overview       : when u click on collaborator icon dialog will open
*  @module         : collaborator-icon.ts - This is optional if expeclictly its an npm or local package
*  @author         : Praneeth Kunapareddy <kunapareddypraneeth47@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */

import { Component, OnInit, Input } from '@angular/core';
import { ColloboratorDialogComponent } from '../colloborator-dialog/colloborator-dialog.component';
import { MatDialog } from '@angular/material';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-collaborator-icon',
  templateUrl: './collaborator-icon.component.html',
  styleUrls: ['./collaborator-icon.component.scss']
})
export class CollaboratorIconComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @Input() collaborator

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized 
   * all data-bound properties of a directive. */
  ngOnInit() {
  }
  colloborator(collaborator): void {
    this.dialog.open(ColloboratorDialogComponent, {
      height: 'auto',
      maxWidth:'auto',
      data: this.collaborator,
      panelClass: 'myapp-no-padding-dialog'
    });
  }
}
