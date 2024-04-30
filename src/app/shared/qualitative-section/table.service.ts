import { Injectable } from '@angular/core'
import { Participacao, TrabalhoEmEventos } from '../services/objTypes'
import { Props } from '../quantitative-section/tpes'

@Injectable({
  providedIn: 'root'
})
export class TableService {
  makeTableContent(
    sectionObjectsToShow: Participacao[] | TrabalhoEmEventos[],
    sectionType: string,
    sectionProps: Props[]
  ): any[][] {
    switch (sectionType) {
      case 'outrasParticipacoesEmEventosCongressos':
        return this.makeParticipacaoTableContent(
          sectionObjectsToShow,
          sectionProps
        )

      default:
        throw new Error('Invalid section type')
    }
  }

  makeParticipacaoTableContent(
    sectionObjectsToShow: Participacao[],
    secttionProps: Props[]
  ): any[][] {
    const tableContent: any[][] = sectionObjectsToShow.map((sectionObject) => {
      const row = secttionProps.map((prop) => {
        const property = prop.key as keyof Participacao
        return { value: sectionObject[property] ?? '', width: prop.width }
      })

      row.push({
        value: this.getParticipantes(sectionObject),
        width: '240px'
      })

      row.push({
        value: this.makePalavrasChave(sectionObject),
        width: '240px'
      })

      return row
    })

    return tableContent
  }

  getParticipantes(participation: Participacao): string {
    let participantes = ''
    if (!participation.participanteDeEventosCongressos) {
      return participantes
    }
    participation.participanteDeEventosCongressos.forEach((participante) => {
      participantes =
        participantes +
        `${participante.nomeParaCitacaoDoParticipanteDeEventosCongressos}.\n `
    })

    return participantes
  }

  makePalavrasChave(sectionObject: TrabalhoEmEventos | Participacao): string {
    const value = sectionObject.palavrasChave
    if (!value) {
      return ''
    }
    return value
      .map((value) => value.trim())
      .filter((value) => value.length > 0)
      .join(', ')
  }
}
