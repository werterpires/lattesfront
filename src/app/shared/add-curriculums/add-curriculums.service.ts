import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateCurriculums, ICurriculum } from '../services/types';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddCurriculumsService {
  constructor(private httpClient: HttpClient) {}

  addCurriculum(
    curriculumsData: ICreateCurriculums
  ): Observable<ICurriculum[]> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return throwError(() => new Error('Access Token not found'));
    }

    return this.httpClient.post<ICurriculum[]>(
      'http://localhost:3000/curriculum',
      curriculumsData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
