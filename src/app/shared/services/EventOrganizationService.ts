/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, OrganizacaoDeEvento } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class EventOrganizationService {
  constructor(private readonly utilsService: UtilsService) {}

  makeOrganizacoesDeEventos(data: any[]): OrganizacaoDeEvento[] {
    const organizations: OrganizacaoDeEvento[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const organization: OrganizacaoDeEvento = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        tipo: element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']._TIPO,
        natureza: element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']._NATUREZA,
        titulo: element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']._TITULO,
        ano: element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']._ANO,
        pais: element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']._PAIS,
        idioma: element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO'][
            '_MEIO-DE-DIVULGACAO'
          ],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO'][
            '_HOME-PAGE-DO-TRABALHO'
          ],
        flagRelevancia:
          element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']['_FLAG-RELEVANCIA'],
        doi: element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']._DOI,
        tituloIngles:
          element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO']['_TITULO-INGLES'],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DA-ORGANIZACAO-DE-EVENTO'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        instituicaoPromotora:
          element['DETALHAMENTO-DA-ORGANIZACAO-DE-EVENTO'][
            '_INSTITUICAO-PROMOTORA'
          ],
        duracaoEmSemanas:
          element['DETALHAMENTO-DA-ORGANIZACAO-DE-EVENTO'][
            '_DURACAO-EM-SEMANAS'
          ],
        flagEventoItinerante:
          element['DETALHAMENTO-DA-ORGANIZACAO-DE-EVENTO'][
            '_FLAG-EVENTO-ITINERANTE'
          ],
        flagCatalogo:
          element['DETALHAMENTO-DA-ORGANIZACAO-DE-EVENTO']['_FLAG-CATALOGO'],
        local: element['DETALHAMENTO-DA-ORGANIZACAO-DE-EVENTO']._LOCAL,
        cidade: element['DETALHAMENTO-DA-ORGANIZACAO-DE-EVENTO']._CIDADE
      }
      organizations.push(organization)
    })

    return organizations
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countOrganizationsByProfessorAndYear(
    professor: string,
    year: string,
    organizations: OrganizacaoDeEvento[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return organizations.filter((organization) => {
      return (
        organization.ano === year &&
        (organization.nome === professor || !organization.nome)
      )
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countOrganizationsByProfessor(
    professor: string,
    yersToConsider: string[],
    organizations: OrganizacaoDeEvento[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const organization of organizations) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (organization.nome === professor || !organization.nome) &&
        (!organization.ano || yersToConsiderSet.has(organization.ano))
      ) {
        count++
      }
    }
    return count
  }

  countOrganizationsByYear(
    year: string,
    programs: OrganizacaoDeEvento[]
  ): number {
    let count = 0
    programs.forEach((organization) => {
      if (organization.ano === year) {
        count++
      }
    })
    return count
  }
}
