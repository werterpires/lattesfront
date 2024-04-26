/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, Participacao } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class ParticipationInCongressService {
  constructor(private readonly utilsService: UtilsService) {}
  makeParticipacoesEmCongressos(data: any[]): Participacao[] {
    const participations: Participacao[] = []
    data.forEach((element) => {
      const palavrasChave = this.utilsService.makePalavrasChave(element)

      let areasDoConhecimento: AreasDoConhecimento = {}

      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const participation: Participacao = {
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza:
          element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO']._NATUREZA,
        titulo: element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO']._TITULO,
        ano: element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO']._ANO,
        pais: element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO']._PAIS,
        idioma: element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_MEIO-DE-DIVULGACAO'
          ],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_HOME-PAGE-DO-TRABALHO'
          ],
        flagRelevancia:
          element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_FLAG-RELEVANCIA'
          ],
        tipoParticipacao:
          element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_TIPO-PARTICIPACAO'
          ],
        formaParticipacao:
          element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_FORMA-PARTICIPACAO'
          ],
        doi: element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO']._DOI,
        tituloIngles:
          element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_TITULO-INGLES'
          ],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        nomeDoEvento:
          element['DETALHAMENTO-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_NOME-DO-EVENTO'
          ],
        codigoInstituicao:
          element['DETALHAMENTO-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_CODIGO-INSTITUICAO'
          ],
        nomeInstituicao:
          element['DETALHAMENTO-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_NOME-INSTITUICAO'
          ],
        localDoEvento:
          element['DETALHAMENTO-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_LOCAL-DO-EVENTO'
          ],
        cidadeDoEvento:
          element['DETALHAMENTO-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_CIDADE-DO-EVENTO'
          ],
        nomeDoEventoIngles:
          element['DETALHAMENTO-DA-PARTICIPACAO-EM-CONGRESSO'][
            '_NOME-DO-EVENTO-INGLES'
          ],
        participanteDeEventosCongressos:
          this.utilsService.makeParticipante(element)
      }
      participations.push(participation)
    })

    return participations
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countParticipationsByProfessorAndYear(
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

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countParticipationsByProfessor(
    professor: string,
    yersToConsider: string[],
    participations: Participacao[]
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

  countParticipationsByYear(
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
