import { Injectable } from '@angular/core'
import {
  OutrasParticipacoesEmEventosCongressos,
  TrabalhoEmEventos
} from '../services/objTypes'
import { CountService } from './counts.service'

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly countService: CountService) {}
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
        this.orderParticipacoes(sectionObjects, orderProp, ascending)

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

  sortProfessorsByParticipationQuantity(
    sectionType: string,
    professors: string[],
    yersToConsider: string[],
    sectionObjects:
      | OutrasParticipacoesEmEventosCongressos[]
      | TrabalhoEmEventos[],
    quantityDesc: boolean
  ): void {
    // Maps each professor to the quantity of their works in events
    const sectionsByProfessor = this.countSectionsByProfessorUsingAny(
      sectionType,
      professors,
      yersToConsider,
      sectionObjects
    )

    // Sorts the professors by the quantity of works they participated in events
    professors.sort((a, b) => {
      return (
        ((sectionsByProfessor.get(b) || 0) -
          (sectionsByProfessor.get(a) || 0)) *
        (quantityDesc ? 1 : -1)
      )
    })
  }

  countSectionsByProfessorUsingAny(
    sectionType: string,
    professors: string[],
    yersToConsider: string[],
    sectionObjects:
      | OutrasParticipacoesEmEventosCongressos[]
      | TrabalhoEmEventos[]
  ): Map<string, number> {
    const sectionsByProfessor = new Map<string, number>()

    professors.forEach((professor) => {
      const professorName = professor.toString()
      let quantity: number

      switch (sectionType) {
        case 'outrasParticipacoesEmEventosCongressos':
          quantity = this.countService.countSectionsByProfessorUsingYear(
            professorName,
            yersToConsider,
            sectionObjects
          )
          break
        default:
          throw new Error('Invalid section type')
      }
      sectionsByProfessor.set(professorName, quantity)
    })

    return sectionsByProfessor
  }
}
