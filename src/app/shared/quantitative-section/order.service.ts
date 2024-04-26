import { Injectable } from '@angular/core'
import {
  OutrasParticipacoesEmEventosCongressos,
  TrabalhoEmEventos
} from '../services/objTypes'

@Injectable({ providedIn: 'root' })
export class OrderService {
  orderNow(
    orderProp: string,
    sectionObjects:
      | OutrasParticipacoesEmEventosCongressos[]
      | TrabalhoEmEventos[],
    sectionType: string,
    ascending: boolean
  ): OutrasParticipacoesEmEventosCongressos[] | TrabalhoEmEventos[] {
    // Filters with values applied

    switch (sectionType) {
      case 'outrasParticipacoesEmEventosCongressos':
        this.orderParticipacoes(
          sectionObjects,
          orderProp,
          ascending
        )

        break
      default:
        throw new Error('Invalid section type')
    }

    return sectionObjects

    // Order the works after filtering
    // this.orderNow()
  }

  orderParticipacoes(
    sectionObjects: OutrasParticipacoesEmEventosCongressos[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof OutrasParticipacoesEmEventosCongressos

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
    ? ascending
      ? -1
      : 1
    : ascending
      ? 1
      : -1
    )
  }
}
