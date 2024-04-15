/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, OutraProducaoTecnica } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class OtherTechnicalProductionService {
  constructor(private readonly utilsService: UtilsService) {}

  makeOutraProducaoTecnica(data: any[]): OutraProducaoTecnica[] {
    const works: OutraProducaoTecnica[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const work: OutraProducaoTecnica = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA']._NATUREZA,
        titulo: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA']._TITULO,
        ano: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA']._ANO,
        pais: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA']._PAIS,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA'][
            '_MEIO-DE-DIVULGACAO'
          ],
        idioma: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA']._IDIOMA,
        homePageDoTrabalho:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA'][
            '_HOME-PAGE-DO-TRABALHO'
          ],
        flagRelevancia:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA'][
            '_FLAG-RELEVANCIA'
          ],
        doi: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA']._DOI,
        tituloIngles:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA']['_TITULO-INGLES'],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO-TECNICA'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        finalidade:
          element['DETALHAMENTO-DE-OUTRA-PRODUCAO-TECNICA']._FINALIDADE,
        instituicaoPromotora:
          element['DETALHAMENTO-DE-OUTRA-PRODUCAO-TECNICA'][
            '_INSTITUICAO-PROMOTORA'
          ],
        local: element['DETALHAMENTO-DE-OUTRA-PRODUCAO-TECNICA']._LOCAL,
        cidade: element['DETALHAMENTO-DE-OUTRA-PRODUCAO-TECNICA']._CIDADE,
        finalidadeIngles:
          element['DETALHAMENTO-DE-OUTRA-PRODUCAO-TECNICA'][
            '_FINALIDADE-INGLES'
          ]
      }
      works.push(work)
    })

    return works
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countProductionsByProfessorAndYear(
    professor: string,
    year: string,
    productions: OutraProducaoTecnica[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return productions.filter((production) => {
      return (
        production.ano === year &&
        (production.nome === professor || !production.nome)
      )
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countWorksByProfessor(
    professor: string,
    yersToConsider: string[],
    productions: OutraProducaoTecnica[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const production of productions) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (production.nome === professor || !production.nome) &&
        (!production.ano || yersToConsiderSet.has(production.ano))
      ) {
        count++
      }
    }
    return count
  }

  countWorksByYear(year: string, eventsWorks: OutraProducaoTecnica[]): number {
    let count = 0
    eventsWorks.forEach((work) => {
      if (work.ano === year) {
        count++
      }
    })
    return count
  }
}
