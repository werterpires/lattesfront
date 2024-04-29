import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'
import { QualitativeEventsWorksComponent } from './qualitative-events-works/qualitative-events-works.component'
import { QuantitativeEventsWorksComponent } from './quantitative-events-works/quantitative-events-works.component'
import { EventsWorkRankingComponent } from './events-work-ranking/events-work-ranking.component'
import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import { EventProps } from './types'
import { TrabalhoEmEventos } from 'src/app/shared/services/objTypes'

@Component({
  selector: 'app-trablhos-em-eventos',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    EventsWorkRankingComponent,
    QualitativeEventsWorksComponent,
    QuantitativeEventsWorksComponent,
    AccordionComponent,
    QuantitativeSectionComponent
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

  constructor(private readonly curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculumns = curriculumns
      this.getWorks()
    })
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
            serviceYears: curriculum.serviceYears
          }))
        ),
      []
    )
  }
}
