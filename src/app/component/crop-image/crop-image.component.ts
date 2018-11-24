import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationComponent } from '../navigation/navigation.component';
import { DataService } from '../../core/services/data/data.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  croppedImage: ''

  constructor(
    private dialogRef1: MatDialogRef<NavigationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private service: DataService, private notesService: NotesService
  ) { }

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

