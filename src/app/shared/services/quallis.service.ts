import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs'
import { IStratum, ITag } from './types'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class QuallisService {
  tagsObject: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([])

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  getStratum(issn: string, title: string): Observable<IStratum> {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      throwError(() => new Error('Access Token not found'))
    }
    return this.httpClient
      .get<IStratum>(environment.API + '/quallis/' + issn + '/' + title + '', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.message))
        })
      )
  }
}
