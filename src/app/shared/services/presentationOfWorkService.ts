/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, ApresentacaoDeTrabalho } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class PresentationOfWorkService {
  constructor(private readonly utilsService: UtilsService) {}

  makeApresentacoesDeTrabalho(data: any[]): ApresentacaoDeTrabalho[] {
    const apresentacoes: ApresentacaoDeTrabalho[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const dev: ApresentacaoDeTrabalho = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza:
          element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO']._NATUREZA,
        titulo: element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO']._TITULO,
        ano: element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO']._ANO,
        pais: element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO']._PAIS,
        idioma: element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO']._IDIOMA,
        flagRelevancia:
          element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO'][
            '_FLAG-RELEVANCIA'
          ],
        doi: element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO']._DOI,
        tituloIngles:
          element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO'][
            '_TITULO-INGLES'
          ],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DA-APRESENTACAO-DE-TRABALHO'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        nomeDoEvento:
          element['DETALHAMENTO-DA-APRESENTACAO-DE-TRABALHO'][
            '_NOME-DO-EVENTO'
          ],
        instituicaoPromotora:
          element['DETALHAMENTO-DA-APRESENTACAO-DE-TRABALHO'][
            '_INSTITUICAO-PROMOTORA'
          ],
        localDaApresentacao:
          element['DETALHAMENTO-DA-APRESENTACAO-DE-TRABALHO'][
            '_LOCAL-DA-APRESENTACAO'
          ],
        cidadeDaApresentacao:
          element['DETALHAMENTO-DA-APRESENTACAO-DE-TRABALHO'][
            '._CIDADE-DA-APRESENTACAO'
          ],

        nomeDoEventoIngles:
          element['DETALHAMENTO-DA-APRESENTACAO-DE-TRABALHO'][
            '_NOME-DO-EVENTO-INGLES'
          ]
      }
      apresentacoes.push(dev)
    })

    return apresentacoes
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countPresentationsByProfessorAndYear(
    professor: string,
    year: string,
    presentations: ApresentacaoDeTrabalho[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return presentations.filter((presentation) => {
      return (
        presentation.ano === year &&
        (presentation.nome === professor || !presentation.nome)
      )
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countPresentationsByProfessor(
    professor: string,
    yersToConsider: string[],
    presentations: ApresentacaoDeTrabalho[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const presentation of presentations) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (presentation.nome === professor || !presentation.nome) &&
        (!presentation.ano || yersToConsiderSet.has(presentation.ano))
      ) {
        count++
      }
    }
    return count
  }

  countPresentationsByYear(
    year: string,
    presentations: ApresentacaoDeTrabalho[]
  ): number {
    let count = 0
    presentations.forEach((presentation) => {
      if (presentation.ano === year) {
        count++
      }
    })
    return count
  }
}
