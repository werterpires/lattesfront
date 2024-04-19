/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, LivroPublicadoOuOrganizado } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class PublishedBookService {
  constructor(private readonly utilsService: UtilsService) {}

  makeLivros(data: any[]): LivroPublicadoOuOrganizado[] {
    const capitulos: LivroPublicadoOuOrganizado[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const dev: LivroPublicadoOuOrganizado = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['_SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['_INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['_SEQUENCIA-PRODUCAO'],

        tipo: element['DADOS-BASICOS-DO-LIVRO']._TIPO,
        natureza: element['DADOS-BASICOS-DO-LIVRO']._NATUREZA,
        tituloDoLivro: element['DADOS-BASICOS-DO-LIVRO']['_TITULO-DO-LIVRO'],
        ano: element['DADOS-BASICOS-DO-LIVRO']._ANO,
        paisDePublicacao:
          element['DADOS-BASICOS-DO-LIVRO']['_PAIS-DE-PUBLICACAO'],
        idioma: element['DADOS-BASICOS-DO-LIVRO']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DO-LIVRO']['  _MEIO-DE-DIVULGACAO'],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DO-LIVRO']['_HOME-PAGE-DO-TRABALHO'],
        flagRelevancia: element['DADOS-BASICOS-DO-LIVRO']['_FLAG-RELEVANCIA'],
        doi: element['DADOS-BASICOS-DO-LIVRO']._DOI,
        tituloDoLivroIngles:
          element['DADOS-BASICOS-DO-LIVRO'][
            '_TITULO-DO-CAPITULO-DO-LIVRO-INGLES'
          ],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DO-LIVRO']['_FLAG-DIVULGACAO-CIENTIFICA'],

        numeroDeVolumes: element['DETALHAMENTO-DO-LIVRO']['_NUMERO-DE-VOLUMES'],
        numeroDePaginas: element['DETALHAMENTO-DO-LIVRO']['_NUMERO-DE-PAGINAS'],
        isbn: element['DETALHAMENTO-DO-LIVRO']._ISBN,
        numeroDaEdicaoRevisao:
          element['DETALHAMENTO-DO-LIVRO']['_NUMERO-DA-EDICAO-REVISAO'],
        numeroDaSerie: element['DETALHAMENTO-DO-LIVRO']['_NUMERO-DA-SERIE'],
        cidadeDaEditora: element['DETALHAMENTO-DO-LIVRO']['_CIDADE-DA-EDITORA'],
        nomeDaEditora: element['DETALHAMENTO-DO-LIVRO']['_NOME-DA-EDITORA']
      }
      capitulos.push(dev)
    })

    return capitulos
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countBooksByProfessorAndYear(
    professor: string,
    year: string,
    books: LivroPublicadoOuOrganizado[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return books.filter((book) => {
      return book.ano === year && (book.nome === professor || !book.nome)
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countBooksByProfessor(
    professor: string,
    yersToConsider: string[],
    books: LivroPublicadoOuOrganizado[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const book of books) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (book.nome === professor || !book.nome) &&
        (!book.ano || yersToConsiderSet.has(book.ano))
      ) {
        count++
      }
    }
    return count
  }

  countBooksByYear(year: string, books: LivroPublicadoOuOrganizado[]): number {
    let count = 0
    books.forEach((book) => {
      if (book.ano === year) {
        count++
      }
    })
    return count
  }
}
