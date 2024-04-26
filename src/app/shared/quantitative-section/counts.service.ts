import { Injectable } from '@angular/core'
import { Participacao, TrabalhoEmEventos } from '../services/objTypes'

@Injectable({ providedIn: 'root' })
export class CountService {
  // ---------- Contar seções por professores em um range de anos (total) ---------------
  countSectionsByProfessorUsingAny(
    professor: string,
    yersToConsider: string[],
    sectionObjects: Participacao[] | TrabalhoEmEventos[],
    sectionType: string
  ): number {
    switch (sectionType) {
      case 'outrasParticipacoesEmEventosCongressos':
        return this.countSectionsByProfessorUsingYear(
          professor,
          yersToConsider,
          sectionObjects
        )

      default:
        throw new Error('Tipo de seção inválida')
    }
  }

  countSectionsByProfessorUsingYear(
    professor: string,
    yersToConsider: string[],
    sectionObjects: Participacao[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const participation of sectionObjects) {
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

  // ---------- Contar seções por professores em um ano ---------------
  countSectionsByProfessorAndYearUsingAny(
    professor: string,
    year: string,
    sectionObjects: Participacao[] | TrabalhoEmEventos[],
    sectionType: string
  ): number {
    switch (sectionType) {
      case 'outrasParticipacoesEmEventosCongressos':
        return this.countSectionsByProfessorAndYearUsingYear(
          professor,
          year,
          sectionObjects
        )

      default:
        throw new Error('Tipo de seção inválida')
    }
  }

  countSectionsByProfessorAndYearUsingYear(
    professor: string,
    year: string,
    participations: Participacao[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return participations.filter((participation) => {
      return (
        participation.ano === year &&
        (participation.nome === professor || !participation.nome)
      )
    }).length
  }

  // ---------- Contar seções por ano ---------------
  countSectionsByYearUsingAny(
    year: string,
    sectionObjects: Participacao[] | TrabalhoEmEventos[],
    sectionType: string
  ): number {
    switch (sectionType) {
      case 'outrasParticipacoesEmEventosCongressos':
        return this.countSectionsByYearUsingYear(year, sectionObjects)

      default:
        throw new Error('Tipo de seção inválida')
    }
  }

  countSectionsByYearUsingYear(
    year: string,
    participations: Participacao[]
  ): number {
    let count = 0
    participations.forEach((participation) => {
      if (participation.ano === year) {
        count++
      }
    })
    return count
  }
}
