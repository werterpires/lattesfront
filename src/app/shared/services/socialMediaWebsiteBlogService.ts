/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, MidiaSocialWebsiteBlog } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class SocialMediaWebsiteBlogService {
  constructor(private readonly utilsService: UtilsService) {}

  makeMidiaSocialWebsiteBlog(data: any[]): MidiaSocialWebsiteBlog[] {
    const works: MidiaSocialWebsiteBlog[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const work: MidiaSocialWebsiteBlog = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        natureza:
          element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG']._NATUREZA,
        naturezaIngles:
          element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG'][
            '_NATUREZA-INGLES'
          ],
        titulo: element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG']._TITULO,
        tituloIngles:
          element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG'][
            '_TITULO-INGLES'
          ],
        ano: element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG']._ANO,
        pais: element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG']._PAIS,
        idioma: element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG']._IDIOMA,
        homePage:
          element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG']['_HOME-PAGE'],
        flagRelevancia:
          element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG'][
            '_FLAG-RELEVANCIA'
          ],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DA-MIDIA-SOCIAL-WEBSITE-BLOG'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        tema: element['DETALHAMENTO-DA-MIDIA-SOCIAL-WEBSITE-BLOG']._TEMA
      }
      works.push(work)
    })

    return works
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countMediaByProfessorAndYear(
    professor: string,
    year: string,
    medias: MidiaSocialWebsiteBlog[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return medias.filter((media) => {
      return media.ano === year && (media.nome === professor || !media.nome)
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countMediasByProfessor(
    professor: string,
    yersToConsider: string[],
    medias: MidiaSocialWebsiteBlog[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const media of medias) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (media.nome === professor || !media.nome) &&
        (!media.ano || yersToConsiderSet.has(media.ano))
      ) {
        count++
      }
    }
    return count
  }

  countMediasByYear(year: string, medias: MidiaSocialWebsiteBlog[]): number {
    let count = 0
    medias.forEach((media) => {
      if (media.ano === year) {
        count++
      }
    })
    return count
  }
}
