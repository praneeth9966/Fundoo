import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(public snackBar: MatSnackBar, private injector: Injector
  ) { }
  handleError(error: Error | HttpErrorResponse) {
    console.error('It happens: ', error);

    // if (error instanceof HttpErrorResponse) {
    //   if (!navigator.onLine) {
    //     this.snackBar.open(error.statusText, "No INternet Connection", {
    //       duration: 3000,
    //     });

    //   }
    //   if (error.status == 500) {
    //     this.snackBar.open(error.statusText, "500", {
    //       duration: 3000,
    //     });
    //   }
    //   if (error.status == 400) {
    //     this.snackBar.open(error.statusText, "400,Bad Request", {
    //       duration: 3000,
    //     });
    //   }
    //   if (error.status == 401) {
    //     this.snackBar.open(error.statusText, "401", {
    //       duration: 3000,
    //     });
    //   }
    //   if (error.status == 404) {
    //     this.snackBar.open(error.statusText, '404,not found', {
    //       duration: 3000,
    //     });
    //   }
    //   if (error.status == 408) {
    //     this.snackBar.open(error.statusText, "408", {
    //       duration: 3000,
    //     });
    //   }
    //   if (error.status == 422) {
    //     this.snackBar.open(error.statusText, "422,unprocessable", {
    //       duration: 3000,
    //     });
    //   }

    // }
    // else {
    //   this.snackBar.open("It happens : ", "Please provide" + error, {
    //     duration: 3000,
    //   });
    //   alert('It happens'+error);

    // }
  }
}
