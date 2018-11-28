/************************************************************************************************
*  Execution       :   1. default node         cmd> crop-image.ts 
*        
*  Purpose         : In this component we will crop our image
* 
*  Description    
* 
*  @file           : crop-image.ts
*  @overview       : In this component we will crop our image
*  @module         : crop-image.ts - This is optional if expeclictly its an npm or local package
*  @author         : Praneeth Kunapareddy <kunapareddypraneeth47@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationComponent } from '../navigation/navigation.component';
import { DataService } from '../../core/services/data/data.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  croppedImage: ''

  constructor(
    private dialogRef1: MatDialogRef<NavigationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private service: DataService, private notesService: NotesService
  ) { }

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized 
   * all data-bound properties of a directive. */
  ngOnInit() {
  }

  imageCropped(event: any) {
    this.croppedImage = event.file;
  }

  /*   calling upload profile image Api
   */
  onUpload() {
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.notesService.imageupload(uploadData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        localStorage.setItem('imageUrl', res['status'].imageUrl);
        this.dialogRef1.close();
        this.service.changeProfile(true);
      })
  }

  /*
    This method will be executed just before Angular destroys the components
    */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

