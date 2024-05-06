import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { MainService } from '../services/main.service';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, exhaustMap, take, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const mainService = inject(MainService);
  const authService = inject(AuthService);
  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      }
      const reqClone = req.clone({
        params: new HttpParams().set('auth', user.token)
      });
      return next(reqClone);
    }),
    catchError((err, caught) => {
      mainService.isLoading.next(false);
      return throwError(() => err);
    })
  );
};
