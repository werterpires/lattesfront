/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, OutraProducaoBibliografica } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class OtherBibliographicWorkService {
  constructor(private readonly utilsService: UtilsService) {}

  makeApresentacoesDeTrabalho(data: any[]): OutraProducaoBibliografica[] {
    const apresentacoes: OutraProducaoBibliografica[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const dev: OutraProducaoBibliografica = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']._NATUREZA,
        titulo: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']._TITULO,
        ano: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']._ANO,
        paisDePublicacao:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']['_PAIS-DE-PUBLICACAO'],
        idioma: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']._IDIOMA,

        meioDeDivulgacao:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']['  _MEIO-DE-DIVULGACAO'],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']['_HOME-PAGE-DO-TRABALHO'],

        flagRelevancia:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']['_FLAG-RELEVANCIA'],
        doi: element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']._DOI,
        tituloIngles:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']['_TITULO-INGLES'],
        naturezaIngles:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO']['_NATUREZA-INGLES'],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DE-OUTRA-PRODUCAO'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        editora: element['DETALHAMENTO-DE-OUTRA-PRODUCAO']._EDITORA,
        cidadeDaEditora:
          element['DETALHAMENTO-DE-OUTRA-PRODUCAO']['_CIDADE-DA-EDITORA'],
        numeroDePaginas:
          element['DETALHAMENTO-DE-OUTRA-PRODUCAO']['_NUMERO-DE-PAGINAS'],
        issnIsbn: element['DETALHAMENTO-DE-OUTRA-PRODUCAO']['_ISSN-ISBN']
      }
      apresentacoes.push(dev)
    })

    return apresentacoes
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countWorksByProfessorAndYear(
    professor: string,
    year: string,
    works: OutraProducaoBibliografica[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return works.filter((work) => {
      return work.ano === year && (work.nome === professor || !work.nome)
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countWorksByProfessor(
    professor: string,
    yersToConsider: string[],
    works: OutraProducaoBibliografica[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const work of works) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (work.nome === professor || !work.nome) &&
        (!work.ano || yersToConsiderSet.has(work.ano))
      ) {
        count++
      }
    }
    return count
  }

  countWorksByYear(year: string, works: OutraProducaoBibliografica[]): number {
    let count = 0
    works.forEach((work) => {
      if (work.ano === year) {
        count++
      }
    })
    return count
  }
}
