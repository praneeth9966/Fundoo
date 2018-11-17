import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit {
  public croppedImage: ''

  constructor(
    private dialogRef1: MatDialogRef<NavigationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private service: DataService
  ) { }

  ngOnInit() {
  }

  imageCropped(event: any) {
    this.croppedImage = event.file;
  }

  /*   calling upload profile image Api
   */
  onUpload() {
    var token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.httpService.httpAddImage('user/uploadProfileImage', uploadData, token).subscribe(res => {
      LoggerService.log('result', res);
      localStorage.setItem('imageUrl', res['status'].imageUrl);
      this.dialogRef1.close();
      this.service.changeProfile(true);
    }, error => {
      LoggerService.log(error);
    })
  }

}

