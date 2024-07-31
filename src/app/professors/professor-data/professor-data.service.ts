import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IUpdateProfessor } from './types'
import { catchError, Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProfessorDataService {
  constructor(private readonly httpClient: HttpClient) {}

  updateProfessor(updateProfessorData: IUpdateProfessor): Observable<any> {
    const accessToken = localStorage.getItem('accessToken')
    return this.httpClient
      .put<any>(environment.API + `/curriculum`, updateProfessorData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .pipe(
        catchError((error) => {
          console.log('erro do doidão', error)
          return throwError(() => new Error('erro'))
        })
      )
  }
}
