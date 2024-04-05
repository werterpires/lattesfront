import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateCurriculums, ICurriculum } from '../services/types';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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
      environment.API + '/curriculum',
      curriculumsData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
