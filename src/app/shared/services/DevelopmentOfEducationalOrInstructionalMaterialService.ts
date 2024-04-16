/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import {
  AreasDoConhecimento,
  DesenvolvimentoDeMaterialDidaticoOuInstrucional
} from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class DevelopmentOfEducationalOrInstructionalMaterialService {
  constructor(private readonly utilsService: UtilsService) {}

  makeDesenvolvimentosDeMateriais(
    data: any[]
  ): DesenvolvimentoDeMaterialDidaticoOuInstrucional[] {
    const devs: DesenvolvimentoDeMaterialDidaticoOuInstrucional[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const dev: DesenvolvimentoDeMaterialDidaticoOuInstrucional = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL']
            ._NATUREZA,
        titulo:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL']._TITULO,
        ano: element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL']._ANO,
        pais: element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL']
          ._PAIS,
        idioma:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL'][
            '_MEIO-DE-DIVULGACAO'
          ],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL'][
            '_HOME-PAGE-DO-TRABALHO'
          ],
        flagRelevancia:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL'][
            '_FLAG-RELEVANCIA'
          ],
        doi: element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL']._DOI,
        tituloIngles:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL'][
            '_TITULO-INGLES'
          ],
        naturezaIngles:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL'][
            '_NATUREZA-INGLES'
          ],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        finalidade:
          element['DETALHAMENTO-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL']
            ._FINALIDADE,
        finalidadeIngles:
          element['DETALHAMENTO-DO-MATERIAL-DIDATICO-OU-INSTRUCIONAL'][
            '_FINALIDADE-INGLES'
          ]
      }
      devs.push(dev)
    })

    return devs
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countDevByProfessorAndYear(
    professor: string,
    year: string,
    devs: DesenvolvimentoDeMaterialDidaticoOuInstrucional[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return devs.filter((dev) => {
      return dev.ano === year && (dev.nome === professor || !dev.nome)
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countDevsByProfessor(
    professor: string,
    yersToConsider: string[],
    devs: DesenvolvimentoDeMaterialDidaticoOuInstrucional[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const dev of devs) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (dev.nome === professor || !dev.nome) &&
        (!dev.ano || yersToConsiderSet.has(dev.ano))
      ) {
        count++
      }
    }
    return count
  }

  countDevsByYear(
    year: string,
    devs: DesenvolvimentoDeMaterialDidaticoOuInstrucional[]
  ): number {
    let count = 0
    devs.forEach((dev) => {
      if (dev.ano === year) {
        count++
      }
    })
    return count
  }
}
