import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessToken, LoginDto } from './types';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(loginDto: LoginDto): Observable<AccessToken> {
    return this.httpClient
      .post<AccessToken>(environment.API + '/login', loginDto)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
