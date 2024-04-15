/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, ProgramaDeRadioOuTV } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class RadioOrTVProgramService {
  constructor(private readonly utilsService: UtilsService) {}

  makeProgramaDeRadioOuTV(data: any[]): ProgramaDeRadioOuTV[] {
    const programs: ProgramaDeRadioOuTV[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const work: ProgramaDeRadioOuTV = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza: element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV']._NATUREZA,
        titulo: element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV']._TITULO,
        ano: element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV']._ANO,
        pais: element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV']._PAIS,
        idioma: element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV']._IDIOMA,
        flagRelevancia:
          element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV'][
            '_FLAG-RELEVANCIA'
          ],
        doi: element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV']._DOI,

        tituloIngles:
          element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV']['_TITULO-INGLES'],

        homePage:
          element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV']['_HOME-PAGE'],
        meioDeDivulgacao:
          element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV'][
            '_MEIO-DE-DIVULGACAO'
          ],

        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DO-PROGRAMA-DE-RADIO-OU-TV'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        emissora: element['DETALHAMENTO-DO-PROGRAMA-DE-RADIO-OU-TV']._EMISSORA,
        tema: element['DETALHAMENTO-DO-PROGRAMA-DE-RADIO-OU-TV']._TEMA,
        formatoDataDaApresentacao:
          element['DETALHAMENTO-DO-PROGRAMA-DE-RADIO-OU-TV'][
            '_FORMATO-DATA-DA-APRESENTACAO'
          ],
        duracaoEmMinutos:
          element['DETALHAMENTO-DO-PROGRAMA-DE-RADIO-OU-TV'][
            '_DURACAO-EM-MINUTOS'
          ],
        cidade: element['DETALHAMENTO-DO-PROGRAMA-DE-RADIO-OU-TV']._CIDADE,
        veiculoDeDivulgacao:
          element['DETALHAMENTO-DO-PROGRAMA-DE-RADIO-OU-TV'][
            '_VEICULO-DE-DIVULGACAO'
          ]
      }
      programs.push(work)
    })

    return programs
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countProgramsByProfessorAndYear(
    professor: string,
    year: string,
    programs: ProgramaDeRadioOuTV[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return programs.filter((program) => {
      return (
        program.ano === year && (program.nome === professor || !program.nome)
      )
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countProgramsByProfessor(
    professor: string,
    yersToConsider: string[],
    programs: ProgramaDeRadioOuTV[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const program of programs) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (program.nome === professor || !program.nome) &&
        (!program.ano || yersToConsiderSet.has(program.ano))
      ) {
        count++
      }
    }
    return count
  }

  countProgramsByYear(year: string, programs: ProgramaDeRadioOuTV[]): number {
    let count = 0
    programs.forEach((program) => {
      if (program.ano === year) {
        count++
      }
    })
    return count
  }
}
