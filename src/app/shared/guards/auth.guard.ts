import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
):
  | boolean
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree>
  | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      } else {
        return router.createUrlTree(['/auth']);
      }
    })
  );
};
