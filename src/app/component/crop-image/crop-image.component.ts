import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { DataService } from '../../core/services/data/data.service';
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

  onUpload() {

    var token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.httpService.httpAddImage('user/uploadProfileImage', uploadData, token).subscribe(res => {


      console.log(res);

      localStorage.setItem('imageUrl', res['status'].imageUrl);
      this.dialogRef1.close();
      this.service.changeProfile(true);
    }, error => {
      console.log(error);
    })

  }


}

