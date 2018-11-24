import { Component, OnInit, Input } from '@angular/core';
import { ColloboratorDialogComponent } from '../colloborator-dialog/colloborator-dialog.component';
import { MatDialog} from '@angular/material';
@Component({
  selector: 'app-collaborator-icon',
  templateUrl: './collaborator-icon.component.html',
  styleUrls: ['./collaborator-icon.component.scss']
})
export class CollaboratorIconComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @Input() collaborator
  ngOnInit() {
  }
  colloborator(collaborator): void {
    this.dialog.open(ColloboratorDialogComponent, {
      width: '500px',
      data: this.collaborator
    });
  }
}
