/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, Editoracao } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class EditorialWorkService {
  constructor(private readonly utilsService: UtilsService) {}

  makeEditoracao(data: any[]): Editoracao[] {
    const works: Editoracao[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const work: Editoracao = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza: element['DADOS-BASICOS-DE-EDITORACAO']._NATUREZA,
        titulo: element['DADOS-BASICOS-DE-EDITORACAO']._TITULO,
        ano: element['DADOS-BASICOS-DE-EDITORACAO']._ANO,
        pais: element['DADOS-BASICOS-DE-EDITORACAO']._PAIS,
        idioma: element['DADOS-BASICOS-DE-EDITORACAO']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DE-EDITORACAO']['_MEIO-DE-DIVULGACAO'],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DE-EDITORACAO']['_HOME-PAGE-DO-TRABALHO'],
        flagRelevancia:
          element['DADOS-BASICOS-DE-EDITORACAO']['_FLAG-RELEVANCIA'],
        doi: element['DADOS-BASICOS-DE-EDITORACAO']._DOI,
        tituloIngles: element['DADOS-BASICOS-DE-EDITORACAO']['_TITULO-INGLES'],

        numeroDePaginas:
          element['DETALHAMENTO-DE-EDITORACAO']['_NUMERO-DE-PAGINAS'],
        instituicaoPromotora:
          element['DETALHAMENTO-DE-EDITORACAO']['_INSTITUICAO-PROMOTORA'],
        editora: element['DETALHAMENTO-DE-EDITORACAO']._EDITORA,
        cidade: element['DETALHAMENTO-DE-EDITORACAO']._CIDADE
      }
      works.push(work)
    })

    return works
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countWorkByProfessorAndYear(
    professor: string,
    year: string,
    works: Editoracao[]
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
    works: Editoracao[]
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

  countWorksByYear(year: string, editorialWorks: Editoracao[]): number {
    let count = 0
    editorialWorks.forEach((work) => {
      if (work.ano === year) {
        count++
      }
    })
    return count
  }
}
