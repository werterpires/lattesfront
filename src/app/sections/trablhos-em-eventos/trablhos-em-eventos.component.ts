import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import { EventProps } from './types'
import { TrabalhoEmEventos } from 'src/app/shared/services/objTypes'
import { QualitativeSectionComponent } from 'src/app/shared/qualitative-section/qualitative-section.component'
import { RankingSectionComponent } from 'src/app/shared/ranking-section/ranking-section.component'

@Component({
  selector: 'app-trablhos-em-eventos',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AccordionComponent,
    QuantitativeSectionComponent,
    QualitativeSectionComponent,
    RankingSectionComponent
  ],
  templateUrl: './trablhos-em-eventos.component.html',
  styleUrl: './trablhos-em-eventos.component.css'
})
export class TrablhosEmEventosComponent {
  curriculumns: ICurriculum[] = []
  trabalhosEmEventos: TrabalhoEmEventos[] = []
  tableElements: ITableElements[] = [
    { title: 'Trabalhos em eventos', property: 'trabalhosEmEventos' }
  ]

  professors: Array<{ name: string; serviceYears: string }> = []

  workProps: EventProps[] = [
    {
      name: 'Professor',
      key: 'nome',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '320px'
    },

    {
      name: 'Ano',
      key: 'anoDeRealizacao',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '40px'
    }
  ]

  eventProps: EventProps[] = [
    {
      name: 'Professor',
      key: 'nome',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },
    {
      name: 'Título do trabalho',
      key: 'tituloDoTrabalho',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '320px'
    },
    {
      name: 'Natureza',
      key: 'natureza',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },
    {
      name: 'Ano do trabalho',
      key: 'anoDoTrabalho',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },
    {
      name: 'País do evento',
      key: 'paisDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },

    {
      name: 'Idioma',
      key: 'idioma',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },
    {
      name: 'Meio de divulgacão',
      key: 'meioDeDivulgacao',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },
    {
      name: 'DOI',
      key: 'doi',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },
    {
      name: 'URL',
      key: 'homePageDoTrabalho',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },

    {
      name: 'Relevância?',
      key: 'flagRelevancia',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },

    {
      name: 'Título do trabalho em inglês',
      key: 'tituloDoTrabalhoIngles',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },

    {
      name: 'Divulgação científica?',
      key: 'flagDivulgacaoCientifica',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },

    {
      name: 'Nome do evento',
      key: 'nomeDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },

    {
      name: 'Classificação do evento',
      key: 'classificacaoDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },

    {
      name: 'Cidade do evento',
      key: 'cidadeDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },

    {
      name: 'Ano de realização',
      key: 'anoDeRealizacao',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },

    {
      name: 'Título dos anais ou proceedings',
      key: 'tituloDosAnaisOuProceedings',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },

    {
      name: 'Volume',
      key: 'volume',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },

    {
      name: 'Fasciculo',
      key: 'fasciculo',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },

    {
      name: 'Serie',
      key: 'serie',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },

    {
      name: 'Pagina inicial',
      key: 'paginaInicial',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },

    {
      name: 'Pagina final',
      key: 'paginaFinal',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },

    {
      name: 'ISBN',
      key: 'isbn',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '80px'
    },

    {
      name: 'Nome da editora',
      key: 'nomeDaEditora',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '160px'
    },

    {
      name: 'Cidade da editora',
      key: 'cidadeDaEditora',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '120px'
    },

    {
      name: 'Nome do evento em inglês',
      key: 'nomeDoEventoIngles',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    }
  ]

  constructor(private readonly curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculumns = curriculumns
      this.getProfessors()
      this.getWorks()
    })
  }

  getProfessors(): void {
    this.professors = this.curriculumns.map((curriculo) => {
      return {
        name: curriculo.curriculum.nome,
        serviceYears: curriculo.serviceYears
      }
    })

    console.log(this.professors)
  }

  countTrabalhosEmEventos(curriculum: ICurriculum): number {
    return curriculum.curriculum.trabalhosEmEventos.length
  }

  getWorks(): void {
    this.trabalhosEmEventos = this.curriculumns.reduce<TrabalhoEmEventos[]>(
      (trabalhos, curriculum) =>
        trabalhos.concat(
          curriculum.curriculum.trabalhosEmEventos.map((work) => ({
            ano: work.anoDeRealizacao,
            nome: curriculum.curriculum.nome,
            lattesid: curriculum.lattesId,
            active: curriculum.active,
            serviceYears: curriculum.serviceYears,
            ...work
          }))
        ),
      []
    )
  }
}
