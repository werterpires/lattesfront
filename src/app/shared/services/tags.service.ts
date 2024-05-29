import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError
} from 'rxjs'
import { ITag } from './types'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tagsObject: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([])

  tags$ = this.tagsObject.asObservable()
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  getAllTags(): Observable<ITag[]> {
    console.log('getAllTags')
    if (typeof localStorage === 'undefined') {
      console.error('LocalStorage is not defined.')
      return of([])
    }
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      this.redirectToLogin()
      return of([])
    }
    return this.httpClient
      .get<ITag[]>(environment.API + '/tags', {
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
        map((tags) => {
          tags = tags.sort((a, b) => {
            if (b.tagName < a.tagName) {
              return -1
            } else {
              return 1
            }
          })

          this.tagsObject.next(tags)
          return tags
        })
      )
  }

  addTags(newTag: ITag[]): void {
    this.tagsObject.next([...this.tagsObject.value, ...newTag])
  }

  redirectToLogin(): void {
    void this.router.navigate(['login'])
  }
}
