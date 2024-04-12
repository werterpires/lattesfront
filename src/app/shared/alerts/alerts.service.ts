import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private readonly showAlertsSubject = new BehaviorSubject<boolean>(false)
  private readonly alertTitleSubject = new BehaviorSubject<string>('')
  private readonly alertTypeSubject = new BehaviorSubject<string>('')
  private readonly alertTextSubject = new BehaviorSubject<string[]>([])

  showAlerts$ = this.showAlertsSubject.asObservable()
  alertTitle$ = this.alertTitleSubject.asObservable()
  alertType$ = this.alertTypeSubject.asObservable()
  alertText$ = this.alertTextSubject.asObservable()

  showAlerts(type: string, title: string, text: string[]): void {
    this.alertTitleSubject.next(title)
    this.alertTypeSubject.next(type)
    this.alertTextSubject.next(text)
    this.showAlertsSubject.next(true)
  }

  hideAlerts(): void {
    this.showAlertsSubject.next(false)
  }
}
