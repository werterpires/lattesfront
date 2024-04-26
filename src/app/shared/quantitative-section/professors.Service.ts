import { Injectable } from '@angular/core'
import { Participacao, TrabalhoEmEventos } from '../services/objTypes'

@Injectable({ providedIn: 'root' })
export class ProfessorsService {
  getProfessors(
    sectionObjects: TrabalhoEmEventos[] | Participacao[],
    professors: string[],
    yersToConsider: string[],
    sectionType: string
  ): string[] {
    const professorsSet = new Set<string>()

    switch (sectionType) {
      case 'outrasParticipacoesEmEventosCongressos':
        this.getProfessorsWithAno(
          sectionObjects as Participacao[],
          yersToConsider,
          professorsSet
        )
        break
      default:
        throw new Error('Invalid section type')
    }

    // Convert the set to an array and assign it to the professors property
    professors = Array.from(professorsSet)

    return professors
  }

  getProfessorsWithAno(
    sectionObjects: Participacao[],
    yersToConsider: string[],
    professorsSet: Set<string>
  ): Set<string> {
    for (const sectionObject of sectionObjects) {
      // If the professor's name is defined and the year of realization is
      // either undefined or inside yersToConsider

      if (
        sectionObject.nome &&
        (!sectionObject.ano || yersToConsider.includes(sectionObject.ano))
      ) {
        // Add the professor's name to the professorsSet set
        professorsSet.add(sectionObject.nome)
      }
    }
    return professorsSet
  }
}
