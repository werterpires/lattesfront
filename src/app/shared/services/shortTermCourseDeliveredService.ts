/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import { AreasDoConhecimento, CursoDeCurtaDuracaoMinistrado } from './objTypes'
import { UtilsService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class ShortTermCourseDeliveredService {
  constructor(private readonly utilsService: UtilsService) {}

  makeCursosCurtosMinistrados(data: any[]): CursoDeCurtaDuracaoMinistrado[] {
    const cursos: CursoDeCurtaDuracaoMinistrado[] = []
    data.forEach((element) => {
      const autores = this.utilsService.makeAutores(element)

      let areasDoConhecimento: AreasDoConhecimento = {}
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.utilsService.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        )
      }

      const palavrasChave = this.utilsService.makePalavrasChave(element)

      const dev: CursoDeCurtaDuracaoMinistrado = {
        autores,
        palavrasChave,
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],

        nivelDoCurso:
          element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_NIVEL-DO-CURSO'
          ],
        titulo:
          element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO']._TITULO,
        ano: element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO']._ANO,
        pais: element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO']._PAIS,
        idioma:
          element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO']._IDIOMA,
        meioDeDivulgacao:
          element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_MEIO-DE-DIVULGACAO'
          ],
        homePageDoTrabalho:
          element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_HOME-PAGE-DO-TRABALHO'
          ],
        flagRelevancia:
          element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_FLAG-RELEVANCIA'
          ],
        doi: element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO']._DOI,
        tituloIngles:
          element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_TITULO-INGLES'
          ],
        flagDivulgacaoCientifica:
          element['DADOS-BASICOS-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_FLAG-DIVULGACAO-CIENTIFICA'
          ],

        participacaoDosAutores:
          element['DETALHAMENTO-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_PARTICIPACAO-DOS-AUTORES'
          ],
        instituicaoPromotoraDoCurso:
          element['DETALHAMENTO-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_INSTITUICAO-PROMOTORA-DO-CURSO'
          ],
        localDoCurso:
          element['DETALHAMENTO-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_LOCAL-DO-CURSO'
          ],
        cidade:
          element['DETALHAMENTO-DE-CURSOS-CURTA-DURACAO-MINISTRADO']._CIDADE,
        duracao:
          element['DETALHAMENTO-DE-CURSOS-CURTA-DURACAO-MINISTRADO']._DURACAO,
        unidade:
          element['DETALHAMENTO-DE-CURSOS-CURTA-DURACAO-MINISTRADO']._UNIDADE,
        unidadeIngles:
          element['DETALHAMENTO-DE-CURSOS-CURTA-DURACAO-MINISTRADO'][
            '_UNIDADE-INGLES'
          ]
      }
      cursos.push(dev)
    })

    return cursos
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countCoursesByProfessorAndYear(
    professor: string,
    year: string,
    courses: CursoDeCurtaDuracaoMinistrado[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return courses.filter((course) => {
      return course.ano === year && (course.nome === professor || !course.nome)
    }).length
  }

  /**
   * Counts the number of events works of a specific professor,
   * filtering by years if necessary.
   */

  countCoursesByProfessor(
    professor: string,
    yersToConsider: string[],
    courses: CursoDeCurtaDuracaoMinistrado[]
  ): number {
    let count = 0
    // We need to convert the array to a Set to speed up the lookups.
    const yersToConsiderSet = new Set(yersToConsider)
    // We iterate over all the events works.
    for (const course of courses) {
      // If the event work belongs to the professor and, if there are years
      // to consider, the year of the event work is in the set of years to
      // consider, we increment the count.
      if (
        (course.nome === professor || !course.nome) &&
        (!course.ano || yersToConsiderSet.has(course.ano))
      ) {
        count++
      }
    }
    return count
  }

  countCoursesByYear(
    year: string,
    courses: CursoDeCurtaDuracaoMinistrado[]
  ): number {
    let count = 0
    courses.forEach((course) => {
      if (course.ano === year) {
        count++
      }
    })
    return count
  }
}
