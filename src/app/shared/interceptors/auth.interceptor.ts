import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MainService } from '../services/main.service';
import { catchError, Observable, throwError } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqClone = req.clone();
    const mainService = inject(MainService);
    return next.handle(req).pipe(
      catchError((err,caught) => {
        mainService.isLoading.next(false);
        return throwError(() => err);
      })
    );
  }
}
