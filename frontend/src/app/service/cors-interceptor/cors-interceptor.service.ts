import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CorsInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin':
          'http://localhost:8080',
      },
    });
    return next.handle(modifiedRequest).pipe(
      retry(1),
      catchError((err) => this.handleError(err)),
      tap(
        (event) => {
          console.log(event);
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error.message);
    } else {
      if (error.status == 401) {
        this.router.navigate(['/login']);
      } else {
        console.log(error.error);
      }
    }
    return throwError(()=>new Error(error.message));
  }
}
