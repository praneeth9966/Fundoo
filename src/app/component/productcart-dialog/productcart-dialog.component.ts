import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-productcart-dialog',
  templateUrl: './productcart-dialog.component.html',
  styleUrls: ['./productcart-dialog.component.scss']
})
export class ProductcartDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData,
  public dialogRef: MatDialogRef<ProductcartDialogComponent>) { }

  ngOnInit() {
    
  }

  dialogClose(){
    this.dialogRef.close();
  }
  
}
