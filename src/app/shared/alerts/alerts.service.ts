import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private showAlertsSubject = new BehaviorSubject<boolean>(false);
  private alertTitleSubject = new BehaviorSubject<string>('');
  private alertTypeSubject = new BehaviorSubject<string>('');
  private alertTextSubject = new BehaviorSubject<string[]>([]);

  showAlerts$ = this.showAlertsSubject.asObservable();
  alertTitle$ = this.alertTitleSubject.asObservable();
  alertType$ = this.alertTypeSubject.asObservable();
  alertText$ = this.alertTextSubject.asObservable();

  showAlerts(type: string, title: string, text: string[]) {
    this.alertTitleSubject.next(title);
    this.alertTypeSubject.next(type);
    this.alertTextSubject.next(text);
    this.showAlertsSubject.next(true);
  }

  hideAlerts() {
    this.showAlertsSubject.next(false);
  }
}
