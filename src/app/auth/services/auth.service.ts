import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MainService } from '../../shared/services/main.service';
import { FirebaseErrorEnum } from '../../shared/enums/firebase-error.enum';

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
  apiUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:REPLACE_ITEM?key=AIzaSyCbrac9e0fHqPkB9EyV0ccXji_wA1lfuho';

  constructor(private http: HttpClient, private mainService: MainService) {
  }

  signUpUser(credentials: { email: string; password: string }) {
    const signupUrl = this.replacePlaceholder(SIGNUP);
    return this.doAuthenticate(signupUrl, credentials);
  }

  loginUser(credentials: { email: string; password: string }) {
    const loginUrl = this.replacePlaceholder(LOGIN);
    return this.doAuthenticate(loginUrl, credentials);
  }

  private doAuthenticate(url: string, credentials: { email: string; password: string }) {
    const reqBody = { ...credentials, returnSecureToken: true };
    return this.http.post<AuthResponseData>(url, reqBody).pipe(
      catchError(errorRes => this.handleError(errorRes))
    );
  }

  private handleError(errorRes: any) {
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => GENERIC_ERROR_MSG);
    }
    const errorMessage = FirebaseErrorEnum[errorRes.error.error.message];
    return throwError(() => errorMessage);
  }

  private replacePlaceholder(value: string): string {
    return this.apiUrl.replace(PLACEHOLDER, value);
  }
}
