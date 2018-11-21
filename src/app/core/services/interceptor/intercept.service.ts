import { Injectable } from '@angular/core';
import {AuthService} from '../../services/auth-guard/auth.service';
import {
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';


@Injectable()//{providedIn: 'root'}

export class InterceptService  implements HttpInterceptor {

	constructor(private authService: AuthService) { }

	// intercept request and add token
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    	// modify request
	    request = request.clone({
	      setHeaders: {
	        Authorization: `${localStorage.getItem('token')}`
	      }
	    });
	   
			LoggerService.log("----request----");

			LoggerService.log('request',request);

			LoggerService.log("--- end of request---");
 

	    return next.handle(request)
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	             
	            // console.log(" all looks good");
	            // http response status code
	            // console.log(event.status);
	          }
	        }, error => {
	   			// http response status code
	          	LoggerService.log("----response----");
	          	console.error("status code:");
	          	console.error(error.status);
	          	console.error(error.message);
	          	LoggerService.log("--- end of response---");

	        })
	      )

    };
  
 
}


