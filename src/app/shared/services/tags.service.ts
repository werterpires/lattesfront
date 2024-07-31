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

  createTag(tagName: string): Observable<ITag> {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      throwError(() => new Error('Access Token not found'))
    }

    return this.httpClient
      .post<ITag>(
        environment.API + '/tags',
        { tagName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.redirectToLogin()
          }
          return throwError(() => new Error(error.error.message))
        })
      )
  }

  getAllTags(): Observable<ITag[]> {
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
          tags.forEach((tag) => {
            tag.back = this.turnAnyNameIntoHexadecimal(tag, 'back')
            tag.color = this.turnAnyNameIntoHexadecimal(tag, 'color')
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

  turnAnyNameIntoHexadecimal(tag: ITag, type: 'back' | 'color'): string {
    const length = tag.tagName.length

    const maxNum = length * 35

    let decimalNum = 0

    for (let i = 0; i < length; i++) {
      const charCode = tag.tagName[i].toLowerCase().charCodeAt(0)
      const charValue =
        this.reference[this.normalizeText(String.fromCharCode(charCode))] || 0
      decimalNum += charValue
    }

    const perCent = decimalNum / maxNum

    const finalDecimalValue = Math.floor(perCent * 16777215)

    let hexValue =
      type === 'back'
        ? finalDecimalValue.toString(16)
        : this.findInverseColor(finalDecimalValue.toString(16))

    hexValue = hexValue.padStart(6, '0')

    if (hexValue.length > 6) {
      hexValue = hexValue.substring(0, 6)
    }

    return '#' + hexValue
  }

  normalizeText(letra: string): string {
    return letra
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ç/g, 'c')
      .replace(/Ç/g, 'C')
      .toLowerCase()
  }

  findInverseColor(color: string): string {
    if (this.isLightColor(color)) {
      return '000000'
    } else {
      return 'ffffff'
    }
  }

  isLightColor(color: string): boolean {
    // Remove o caractere '#' se estiver presente
    const hexValue = color.startsWith('#') ? color.slice(1) : color

    // Converter componentes R, G, B de hexadecimal para decimal
    const r = parseInt(hexValue.slice(0, 2), 16)
    const g = parseInt(hexValue.slice(2, 4), 16)
    const b = parseInt(hexValue.slice(4, 6), 16)

    // Calcular a luminosidade percebida
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    // Definir um limiar de luminosidade
    const threshold = 128 // Meio do intervalo 0-255

    // Comparar a luminosidade com o limiar
    return luminance > threshold
  }

  reference: Record<any, number> = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    g: 16,
    h: 17,
    i: 18,
    j: 19,
    k: 20,
    l: 21,
    m: 22,
    n: 23,
    o: 24,
    p: 25,
    q: 26,
    r: 27,
    s: 28,
    t: 29,
    u: 30,
    v: 31,
    w: 32,
    x: 33,
    y: 34,
    z: 35
  }
}
