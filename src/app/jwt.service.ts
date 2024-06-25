import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService implements HttpInterceptor {
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') || null;
    return next
      .handle(
        request.clone({
          setHeaders: {
            Authorization: `${token}`,
          },
        })
      )
      .pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              const token = event.body.jwtBearerToken
              if (token) {
                console.log('token', token);
                
                localStorage.setItem('token', token);
              }
            }
          }
        ),
        catchError((error: HttpErrorResponse): Observable<any> => {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      )
  }
}

// .pipe(
//   tap((event: HttpEvent<any>) => {
//     if (event instanceof HttpResponse) {
//       const token = event.headers.get('Authorization');
//       if (token) {
//         localStorage.setItem('token', token);
//       }
//     }
//   }, (err) => {
//     if (err instanceof HttpErrorResponse) {
//       if (err.status === 401) {
//         localStorage.removeItem('token');
//         this.router.navigate(['/login']);
//       }
//     }
//   })
// );
