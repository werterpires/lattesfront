/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, Artigo } from './objTypes'
import { UtilsService } from './util.service'
import { IStratum } from './types'
import { QuallisService } from './quallis.service'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  estrato: IStratum = {
    stratum: 'arroz'
  }

  constructor(
    private readonly utilsService: UtilsService,
    private readonly quallisService: QuallisService
  ) {}

  async makeArtigos(data: any[]): Promise<Artigo[]> {
    const articles: Artigo[] = []
    for (const element of data) {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)
      const issn = element['DETALHAMENTO-DO-ARTIGO']._ISSN
      const title =
        element['DETALHAMENTO-DO-ARTIGO']['_TITULO-DO-PERIODICO-OU-REVISTA']

      console.log(issn, title)
      console.log(typeof issn, typeof title)
      console.log(issn.trim().length > 1)

      if (issn && issn.trim().length > 0 && title && title.trim().length > 0) {
        await this.getStratum(issn, title.replace(/ /g, '_'))
      }

      const dev: Artigo = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['_SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['_INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['_SEQUENCIA-PRODUCAO'],
        ordemImportancia: element['_ORDEM-IMPORTANCIA'],

        natureza: element['DADOS-BASICOS-DO-ARTIGO']._NATUREZA,
        tituloDoArtigo: element['DADOS-BASICOS-DO-ARTIGO']['_TITULO-DO-ARTIGO'],
        anoDoArtigo: element['DADOS-BASICOS-DO-ARTIGO']['_ANO-DO-ARTIGO'],
        paisDePublicacao:
          element['DADOS-BASICOS-DO-ARTIGO']['_PAIS-DE-PUBLICACAO'],
        idioma: element['DADOS-BASICOS-DO-ARTIGO']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DO-ARTIGO']['_MEIO-DE-DIVULGACAO'],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DO-ARTIGO']['_HOME-PAGE-DO-TRABALHO'],
        flagRelevancia: element['DADOS-BASICOS-DO-ARTIGO']['_FLAG-RELEVANCIA'],
        doi: element['DADOS-BASICOS-DO-ARTIGO']._DOI,
        tituloDoArtigoIngles:
          element['DADOS-BASICOS-DO-ARTIGO']['_TITULO-DO-ARTIGO-INGLES'],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DO-ARTIGO']['_FLAG-DIVULGACAO-CIENTIFICA'],

        tituloDoPeriodicoOuRevista:
          element['DETALHAMENTO-DO-ARTIGO']['_TITULO-DO-PERIODICO-OU-REVISTA'],
        issn: element['DETALHAMENTO-DO-ARTIGO']._ISSN,
        volume: element['DETALHAMENTO-DO-ARTIGO']._VOLUME,
        fasciculo: element['DETALHAMENTO-DO-ARTIGO']._FASCICULO,
        serie: element['DETALHAMENTO-DO-ARTIGO']._SERIE,
        paginaInicial: element['DETALHAMENTO-DO-ARTIGO']['_PAGINA-INICIAL'],
        paginaFinal: element['DETALHAMENTO-DO-ARTIGO']['_PAGINA-FINAL'],
        localDePublicacao:
          element['DETALHAMENTO-DO-ARTIGO']['_LOCAL-DE-PUBLICACAO'],
        estrato: this.estrato?.stratum || 'Não localizado'
      }

      articles.push(dev)
      this.estrato = { stratum: '' }
    }
    return articles
  }

  async getStratum(issn: string, title: string): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.quallisService.getStratum(issn, title).subscribe({
        next: (stratum) => {
          this.estrato = stratum

          resolve()
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countArticlesByProfessorAndYear(
    professor: string,
    year: string,
    articles: Artigo[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return articles.filter((article) => {
      return (
        article.anoDoArtigo === year &&
        (article.nome === professor || !article.nome)
      )
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countArticlesByProfessor(
    professor: string,
    yersToConsider: string[],
    articles: Artigo[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const article of articles) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (article.nome === professor || !article.nome) &&
        (!article.anoDoArtigo || yersToConsiderSet.has(article.anoDoArtigo))
      ) {
        count++
      }
    }
    return count
  }

  countArticlesByYear(year: string, articles: Artigo[]): number {
    let count = 0
    articles.forEach((article) => {
      if (article.anoDoArtigo === year) {
        count++
      }
    })
    return count
  }
}
