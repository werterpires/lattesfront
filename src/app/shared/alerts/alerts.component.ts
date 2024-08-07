import { Component } from '@angular/core'
import { ModalComponent } from '../modal/modal.component'
import { NgFor, NgIf, NgStyle } from '@angular/common'
import { AlertsService } from './alerts.service'

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [ModalComponent, NgStyle, NgIf, NgFor],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
  title: string = ''
  text: string[] = []
  alertType: string = ''
  showAlert = false

  alertTypes: Record<
    string,
    {
      color: string
      icon: string
      ok: boolean
      cancel: boolean
      confirm: boolean
    }
  > = {
    error: {
      color: '#D9534F',
      icon: 'errorIcon',
      ok: true,
      cancel: false,
      confirm: false
    },
    success: {
      color: '#003b71',
      icon: 'doneIcon',
      ok: true,
      cancel: false,
      confirm: false
    },
    warning: {
      color: '#aaa13c',
      icon: 'warning_outline',
      ok: false,
      cancel: true,
      confirm: true
    },
    info: {
      color: '#3c43aa',
      icon: 'info_outline',
      ok: true,
      cancel: false,
      confirm: false
    }
  }

  constructor(private readonly alertsService: AlertsService) {
    this.alertsService.showAlerts$.subscribe((showAlerts) => {
      this.showAlert = showAlerts
    })
    this.alertsService.alertType$.subscribe((alertType) => {
      this.alertType = alertType
    })
    this.alertsService.alertText$.subscribe((alertText) => {
      this.text = alertText
    })
    this.alertsService.alertTitle$.subscribe((alertTitle) => {
      this.title = alertTitle
    })
  }

  hideAlerts(): void {
    this.alertsService.hideAlerts()
  }
}
