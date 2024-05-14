import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs'
import { ICurriculum } from './types'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CurriculumnsService {
  curriculumnsObject: BehaviorSubject<ICurriculum[]> = new BehaviorSubject<
    ICurriculum[]
  >([])

  curriculumns$ = this.curriculumnsObject.asObservable()
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  getAllCurriculumns(): Observable<ICurriculum[]> {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      this.redirectToLogin()
    }
    return this.httpClient
      .get<ICurriculum[]>(environment.API + '/curriculum', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.redirectToLogin()
          }
          return throwError(() => new Error(error.error.message))
        }),
        map((curriculumns) => {
          curriculumns = this.extractCurriculumns(curriculumns).sort((a, b) => {
            if (b.curriculum.nome < a.curriculum.nome) {
              return 1
            } else {
              return -1
            }
          })

          this.curriculumnsObject.next(curriculumns)
          return curriculumns
        })
      )
  }

  addCurriculumns(newCurriculum: ICurriculum[]): void {
    newCurriculum = this.extractCurriculumns(newCurriculum)
    this.curriculumnsObject.next([
      ...this.curriculumnsObject.value,
      ...newCurriculum
    ])
  }

  extractCurriculumns(initialCurriculumns: ICurriculum[]): ICurriculum[] {
    const curriculumns: ICurriculum[] = initialCurriculumns.map((curr) => {
      if (typeof curr.curriculum === 'string') {
        return { ...curr, curriculum: JSON.parse(curr.curriculum) }
      }
      return curr
    })
    return curriculumns
  }

  redirectToLogin(): void {
    void this.router.navigate(['login'])
  }
}
