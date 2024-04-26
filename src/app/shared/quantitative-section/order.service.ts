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
          quantity = this.countSectionsByProfessorUsingYear(
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

  countSectionsByProfessorUsingYear(
    professor: string,
    yersToConsider: string[],
    participations: OutrasParticipacoesEmEventosCongressos[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const participation of participations) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (participation.nome === professor || !participation.nome) &&
        (!participation.ano || yersToConsiderSet.has(participation.ano))
      ) {
        count++
      }
    }
    return count
  }
}
