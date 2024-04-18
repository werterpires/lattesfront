/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, TextoEmJornalOuRevista } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class TextInNewspaperOrMagazineService {
  constructor(private readonly utilsService: UtilsService) {}

  makeTextosEmJornaisOuRevistas(data: any[]): TextoEmJornalOuRevista[] {
    const textos: TextoEmJornalOuRevista[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const texto: TextoEmJornalOuRevista = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza: element['DADOS-BASICOS-DO-TEXTO']._NATUREZA,
        tituloDoTexto: element['DADOS-BASICOS-DO-TEXTO']['_TITULO-DO-TEXTO'],
        anoDoTexto: element['DADOS-BASICOS-DO-TEXTO']['_ANO-DO-TEXTO'],
        paisDePublicacao:
          element['DADOS-BASICOS-DO-TEXTO']['_PAIS-DE-PUBLICACAO'],
        idioma: element['DADOS-BASICOS-DO-TEXTO']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DO-TEXTO']['_MEIO-DE-DIVULGACAO'],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DO-TEXTO']['_HOME-PAGE-DO-TRABALHO'],
        flagRelevancia: element['DADOS-BASICOS-DO-TEXTO']['_FLAG-RELEVANCIA'],
        doi: element['DADOS-BASICOS-DO-TEXTO']._DOI,
        tituloDoTextoIngles:
          element['DADOS-BASICOS-DO-TEXTO']['_TITULO-DO-TEXTO-INGLES'],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DO-TEXTO']['_FLAG-DIVULGACAO-CIENTIFICA'],

        tituloDoJornalOuRevista:
          element['DETALHAMENTO-DO-TEXTO']['_TITULO-DO-JORNAL-OU-REVISTA'],
        issn: element['DETALHAMENTO-DO-TEXTO']._ISSN,
        formatoDataDePublicacao:
          element['DETALHAMENTO-DO-TEXTO']['_FORMATO-DATA-DE-PUBLICACAO'],
        dataDePublicacao:
          element['DETALHAMENTO-DO-TEXTO']['_DATA-DE-PUBLICACAO'],
        volume: element['DETALHAMENTO-DO-TEXTO']._VOLUME,
        paginaInicial: element['DETALHAMENTO-DO-TEXTO']['_PAGINA-INICIAL'],
        paginaFinal: element['DETALHAMENTO-DO-TEXTO']['_PAGINA-FINAL'],
        localDePublicacao:
          element['DETALHAMENTO-DO-TEXTO']['_LOCAL-DE-PUBLICACAO']
      }
      textos.push(texto)
    })

    return textos
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countTextsByProfessorAndYear(
    professor: string,
    year: string,
    texts: TextoEmJornalOuRevista[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return texts.filter((text) => {
      return text.anoDoTexto === year && (text.nome === professor || !text.nome)
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countTextsByProfessor(
    professor: string,
    yersToConsider: string[],
    texts: TextoEmJornalOuRevista[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const text of texts) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (text.nome === professor || !text.nome) &&
        (!text.anoDoTexto || yersToConsiderSet.has(text.anoDoTexto))
      ) {
        count++
      }
    }
    return count
  }

  countTextsByYear(year: string, texts: TextoEmJornalOuRevista[]): number {
    let count = 0
    texts.forEach((text) => {
      if (text.anoDoTexto === year) {
        count++
      }
    })
    return count
  }
}
