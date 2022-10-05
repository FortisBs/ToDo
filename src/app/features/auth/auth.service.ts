import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { AuthResponseData } from "../../shared/models/auth.model";
import { User } from "../../shared/models/user.model";
import { Router } from "@angular/router";

type LocalStorageUser = {
  email: string,
  id: string,
  _token: string,
  _tokenExpirationDate: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentPage = new Subject<string>();
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBabEcff0o2NYWXMXlUSi70J5t0rViHL6c',
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBabEcff0o2NYWXMXlUSi70J5t0rViHL6c',
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('ToDoUser');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const localData = localStorage.getItem('ToDoUser');
    if (!localData) return;

    const userData: LocalStorageUser = JSON.parse(localData);
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(email, userId, token, expirationDate);

    this.user.next(newUser);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('ToDoUser', JSON.stringify(newUser));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string;

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      default:
        errorMessage = 'An unknown error occurred!';
    }

    return throwError(errorMessage);
  }
}
