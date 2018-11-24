import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth-guard/auth.service';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()//{providedIn: 'root'}

export class InterceptService implements HttpInterceptor {

	constructor(private authService: AuthService) { }

	// intercept request and add token
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		// modify request
		request = request.clone({
			setHeaders: {
				Authorization: `${localStorage.getItem('token')}`
			}
		});

		return next.handle(request)
			// .pipe(
			// 	tap(event => {
			// 		if (event instanceof HttpResponse) {
			// 		}
			// 	}, error => {
				
			// 	})
			// )
	};


}


