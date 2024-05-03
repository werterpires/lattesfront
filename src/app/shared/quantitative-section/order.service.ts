import { Injectable } from '@angular/core'
import {
  OutraProducaoTecnica,
  Participacao,
  TrabalhoEmEventos
} from '../services/objTypes'
import { CountService } from './counts.service'

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly countService: CountService) {}
  orderNow(
    orderProp: string,
    sectionObjects:
      | Participacao[]
      | TrabalhoEmEventos[]
      | OutraProducaoTecnica[],
    sectionType: string,
    ascending: boolean
  ): Participacao[] | TrabalhoEmEventos[] | OutraProducaoTecnica[] {
    // Filters with values applied

    switch (sectionType) {
      case 'participacoesEmCongressos':
      case 'participacoesEmSeminarios':
      case 'participacoesEmSimposios':
      case 'participacoesEmEncontros':
      case 'outrasParticipacoesEmEventosCongressos':
        this.orderParticipacoes(sectionObjects, orderProp, ascending)
        break

      case 'trabalhosEmEventos':
        this.orderEventsWorks(sectionObjects, orderProp, ascending)

        break
      case 'outrasProducoesTecnicas':
        this.orderOtherTechnicalProductions(
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
    sectionObjects: Participacao[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof Participacao

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

  orderEventsWorks(
    sectionObjects: TrabalhoEmEventos[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof TrabalhoEmEventos

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

  orderOtherTechnicalProductions(
    sectionObjects: OutraProducaoTecnica[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof OutraProducaoTecnica

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
    sectionObjects: Participacao[] | TrabalhoEmEventos[],
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
    sectionObjects: Participacao[] | TrabalhoEmEventos[]
  ): Map<string, number> {
    const sectionsByProfessor = new Map<string, number>()

    professors.forEach((professor) => {
      const professorName = professor.toString()

      const quantity = this.countService.countSectionsByProfessorUsingYear(
        professorName,
        yersToConsider,
        sectionObjects
      )

      sectionsByProfessor.set(professorName, quantity)
    })

    return sectionsByProfessor
  }
}
