import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from '../services/main.service';
import { catchError, exhaustMap, Observable, take, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  idToken = '';

  constructor(
    private mainService: MainService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const reqClone = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(reqClone);
      }),
      catchError((err, caught) => {
        this.mainService.isLoading.next(false);
        return throwError(() => err);
      })
    );
  }
}
