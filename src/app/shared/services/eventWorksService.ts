/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, TrabalhoEmEventos } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class EventsWorksService {
  constructor(private readonly utilsService: UtilsService) {}

  makeTrabalhoEmEvento(data: any[]): TrabalhoEmEventos[] {
    const works: TrabalhoEmEventos[] = []
    data.forEach((element) => {
      const autores = element.AUTORES_asArray.map((a: any) => {
        return {
          nomeCompletoDoAutor: a['_NOME-COMPLETO-DO-AUTOR'],
          nomeParaCitacao: a['_NOME-PARA-CITACAO'],
          ordemDeAutoria: a['_ORDEM-DE-AUTORIA'],
          cpf: a._CPF,
          numeroIdCNPQ: a['_NUMERO-ID-CNPQ']
        }
      })

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const work: TrabalhoEmEventos = {
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],

        natureza: element['DADOS-BASICOS-DO-TRABALHO']._NATUREZA,
        tituloDoTrabalho:
          element['DADOS-BASICOS-DO-TRABALHO']['_TITULO-DO-TRABALHO'],
        anoDoTrabalho: element['DADOS-BASICOS-DO-TRABALHO']['_ANO-DO-TRABALHO'],
        paisDoEvento: element['DADOS-BASICOS-DO-TRABALHO']['_PAIS-DO-EVENTO'],
        idioma: element['DADOS-BASICOS-DO-TRABALHO']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DO-TRABALHO']['_MEIO-DE-DIVULGACAO'],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DO-TRABALHO']['_HOME-PAGE-DO-TRABALHO'],
        flagRelevancia:
          element['DADOS-BASICOS-DO-TRABALHO']['_FLAG-RELEVANCIA'],
        doi: element['DADOS-BASICOS-DO-TRABALHO']._DOI,
        tituloDoTrabalhoIngles:
          element['DADOS-BASICOS-DO-TRABALHO']['_TITULO-DO-TRABALHO-INGLES'],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DO-TRABALHO']['_FLAG-DIVULGACAO-CIENTIFICA'],

        classificacaoDoEvento:
          element['DETALHAMENTO-DO-TRABALHO']['_CLASSIFICACAO-DO-EVENTO'],
        nomeDoEvento: element['DETALHAMENTO-DO-TRABALHO']['_NOME-DO-EVENTO'],
        cidadeDoEvento:
          element['DETALHAMENTO-DO-TRABALHO']['_CIDADE-DO-EVENTO'],
        anoDeRealizacao:
          element['DETALHAMENTO-DO-TRABALHO']['_ANO-DE-REALIZACAO'],
        tituloDosAnaisOuProceedings:
          element['DETALHAMENTO-DO-TRABALHO'][
            '_TITULO-DOS-ANAIS-OU-PROCEEDINGS'
          ],
        volume: element['DETALHAMENTO-DO-TRABALHO']._VOLUME,
        fasciculo: element['DETALHAMENTO-DO-TRABALHO']._FASCICULO,
        serie: element['DETALHAMENTO-DO-TRABALHO']._SERIE,
        paginaInicial: element['DETALHAMENTO-DO-TRABALHO']['_PAGINA-INICIAL'],
        paginaFinal: element['DETALHAMENTO-DO-TRABALHO']['_PAGINA-FINAL'],
        isbn: element['DETALHAMENTO-DO-TRABALHO']._ISBN,
        nomeDaEditora: element['DETALHAMENTO-DO-TRABALHO']['_NOME-DA-EDITORA'],
        cidadeDaEditora:
          element['DETALHAMENTO-DO-TRABALHO']['_CIDADE-DA-EDITORA'],
        nomeDoEventoIngles:
          element['DETALHAMENTO-DO-TRABALHO']['_NOME-DO-EVENTO-INGLES'],
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE']
      }
      works.push(work)
    })

    return works
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countWorksByProfessorAndYear(
    professor: string,
    year: string,
    eventsWorks: TrabalhoEmEventos[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return eventsWorks.filter((work) => {
      return (
        work.anoDeRealizacao === year && (work.nome === professor || !work.nome)
      )
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countWorksByProfessor(
    professor: string,
    yersToConsider: string[],
    eventsWorks: TrabalhoEmEventos[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const work of eventsWorks) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (work.nome === professor || !work.nome) &&
        (!work.anoDeRealizacao || yersToConsiderSet.has(work.anoDeRealizacao))
      ) {
        count++
      }
    }
    return count
  }

  countWorksByYear(year: string, eventsWorks: TrabalhoEmEventos[]): number {
    let count = 0
    eventsWorks.forEach((work) => {
      if (work.anoDeRealizacao === year) {
        count++
      }
    })
    return count
  }

  // makePalavrasChave(data: {
  //   'PALAVRAS-CHAVE': {
  //     '_PALAVRA-CHAVE-1'?: string
  //     '_PALAVRA-CHAVE-2'?: string
  //     '_PALAVRA-CHAVE-3'?: string
  //     '_PALAVRA-CHAVE-4'?: string
  //     '_PALAVRA-CHAVE-5'?: string
  //   }
  // }): string[] {
  //   const palavrasChave: string[] = []
  //   if (data['PALAVRAS-CHAVE']) {
  //     palavrasChave.push(
  //       data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-1']
  //         ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-1']
  //         : ''
  //     )
  //     palavrasChave.push(
  //       data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-2']
  //         ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-2']
  //         : ''
  //     )
  //     palavrasChave.push(
  //       data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-3']
  //         ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-3']
  //         : ''
  //     )
  //     palavrasChave.push(
  //       data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-4']
  //         ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-4']
  //         : ''
  //     )
  //     palavrasChave.push(
  //       data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-5']
  //         ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-5']
  //         : ''
  //     )
  //   }
  //   return palavrasChave
  // }

  makeAreasDoConhecimento(data: any): AreasDoConhecimento {
    const areasDoConhecimento: AreasDoConhecimento = {}
    if (data['AREA-DO-CONHECIMENTO-1']) {
      areasDoConhecimento.areaDoConhecimento1 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-ESPECIALIDADE']
      }
    }
    if (data['AREA-DO-CONHECIMENTO-2']) {
      areasDoConhecimento.areaDoConhecimento2 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-ESPECIALIDADE']
      }
    }
    if (data['AREA-DO-CONHECIMENTO-3']) {
      areasDoConhecimento.areaDoConhecimento3 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-ESPECIALIDADE']
      }
    }
    return areasDoConhecimento
  }
}
