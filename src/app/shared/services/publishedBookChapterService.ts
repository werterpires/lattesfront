/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, CapituloDeLivroPublicado } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class PublishedBookChapterService {
  constructor(private readonly utilsService: UtilsService) {}

  makeApresentacoesDeTrabalho(data: any[]): CapituloDeLivroPublicado[] {
    const capitulos: CapituloDeLivroPublicado[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const dev: CapituloDeLivroPublicado = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['_SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['_INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['_SEQUENCIA-PRODUCAO'],

        tipo: element['DADOS-BASICOS-DO-CAPITULO']._TIPO,
        tituloDoCapituloDoLivro:
          element['DADOS-BASICOS-DO-CAPITULO']['_TITULO-DO-CAPITULO-DO-LIVRO'],
        ano: element['DADOS-BASICOS-DO-CAPITULO']._ANO,
        paisDePublicacao:
          element['DADOS-BASICOS-DO-CAPITULO']['_PAIS-DE-PUBLICACAO'],
        idioma: element['DADOS-BASICOS-DO-CAPITULO']._IDIOMA,

        meioDeDivulgacao:
          element['DADOS-BASICOS-DO-CAPITULO']['  _MEIO-DE-DIVULGACAO'],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DO-CAPITULO']['_HOME-PAGE-DO-TRABALHO'],

        flagRelevancia:
          element['DADOS-BASICOS-DO-CAPITULO']['_FLAG-RELEVANCIA'],
        doi: element['DADOS-BASICOS-DO-CAPITULO']._DOI,
        tituloDoCapituloDoLivroIngles:
          element['DADOS-BASICOS-DO-CAPITULO'][
            '_TITULO-DO-CAPITULO-DO-LIVRO-INGLES'
          ],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DO-CAPITULO']['_FLAG-DIVULGACAO-CIENTIFICA'],

        tituloDoLivro: element['DETALHAMENTO-DO-CAPITULO']['_TITULO-DO-LIVRO'],
        numeroDeVolumes:
          element['DETALHAMENTO-DO-CAPITULO']['_NUMERO-DE-VOLUMES'],
        paginaInicial: element['DETALHAMENTO-DO-CAPITULO']['_PAGINA-INICIAL'],
        paginaFinal: element['DETALHAMENTO-DO-CAPITULO']['_PAGINA-FINAL'],
        isbn: element['DETALHAMENTO-DO-CAPITULO']._ISBN,
        organizadores: element['DETALHAMENTO-DO-CAPITULO']._ORGANIZADORES,
        numeroDaEdicaoRevisao:
          element['DETALHAMENTO-DO-CAPITULO']['_NUMERO-DA-EDICAO-REVISAO'],
        numeroDaSerie: element['DETALHAMENTO-DO-CAPITULO']['_NUMERO-DA-SERIE'],
        cidadeDaEditora:
          element['DETALHAMENTO-DO-CAPITULO']['_CIDADE-DA-EDITORA'],
        nomeDaEditora: element['DETALHAMENTO-DO-CAPITULO']['_NOME-DA-EDITORA']
      }
      capitulos.push(dev)
    })

    return capitulos
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countChaptersByProfessorAndYear(
    professor: string,
    year: string,
    chapters: CapituloDeLivroPublicado[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return chapters.filter((chapter) => {
      return (
        chapter.ano === year && (chapter.nome === professor || !chapter.nome)
      )
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countChaptersByProfessor(
    professor: string,
    yersToConsider: string[],
    chapters: CapituloDeLivroPublicado[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const chapter of chapters) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (chapter.nome === professor || !chapter.nome) &&
        (!chapter.ano || yersToConsiderSet.has(chapter.ano))
      ) {
        count++
      }
    }
    return count
  }

  countChaptersByYear(
    year: string,
    chapters: CapituloDeLivroPublicado[]
  ): number {
    let count = 0
    chapters.forEach((chapter) => {
      if (chapter.ano === year) {
        count++
      }
    })
    return count
  }
}
