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
      return secttionProps.map((prop) => {
        const property = prop.key as keyof Participacao
        return { value: sectionObject[property] ?? '', width: prop.width }
      })
    })

    return tableContent
  }
}
