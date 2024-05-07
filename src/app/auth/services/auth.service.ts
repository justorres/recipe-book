import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { FirebaseErrorEnum } from '../../shared/enums/firebase-error.enum';
import { UserModel } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const PLACEHOLDER: string = 'REPLACE_ITEM';
const SIGNUP: string = 'signUp';
const LOGIN: string = 'signInWithPassword';
const GENERIC_ERROR_MSG: string = 'An error occurred';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;
  apiUrl =
    `https://identitytoolkit.googleapis.com/v1/accounts:REPLACE_ITEM?key=${environment.apiKey}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signUpUser(credentials: { email: string; password: string }) {
    const signupUrl = this.replacePlaceholder(SIGNUP);
    return this.doAuthenticate(signupUrl, credentials);
  }

  loginUser(credentials: { email: string; password: string }) {
    const loginUrl = this.replacePlaceholder(LOGIN);
    return this.doAuthenticate(loginUrl, credentials);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    } else {
      this.logoutUser();
    }
  }

  logoutUser() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logoutUser();
    }, expirationDuration);
  }

  private doAuthenticate(
    url: string,
    credentials: { email: string; password: string }
  ) {
    const reqBody = { ...credentials, returnSecureToken: true };
    return this.http.post<AuthResponseData>(url, reqBody).pipe(
      catchError((errorRes) => this.handleError(errorRes)),
      tap((resData) => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: any) {
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => GENERIC_ERROR_MSG);
    }
    let errorMessage = '';

    if(FirebaseErrorEnum[errorRes.error.error.message]) {
      errorMessage = FirebaseErrorEnum[errorRes.error.error.message];
    } else {
      errorMessage = 'Something went wrong';
    }
    return throwError(() => errorMessage);
  }

  private replacePlaceholder(value: string): string {
    return this.apiUrl.replace(PLACEHOLDER, value);
  }
}
