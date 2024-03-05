import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { ICurriculum } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CurriculumnsService {
  curriculumnsObject: BehaviorSubject<ICurriculum[]> = new BehaviorSubject<
    ICurriculum[]
  >([]);

  curriculumns$ = this.curriculumnsObject.asObservable();
  constructor(private httpClient: HttpClient) {}

  getAllCurriculumns(): Observable<ICurriculum[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return throwError(() => new Error('Access Token not found'));
    }
    return this.httpClient
      .get<ICurriculum[]>('http://localhost:3000/curriculum', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
        map((curriculumns) => {
          this.curriculumnsObject.next(curriculumns);
          return curriculumns;
        })
      );
  }
}
