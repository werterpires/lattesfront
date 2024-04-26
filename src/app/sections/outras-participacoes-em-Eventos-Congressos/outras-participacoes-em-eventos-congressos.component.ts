import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeOthersEventsComponent } from './quantitative-outras-participacoes-em-eventos-congressos/quantitative-outras-participacoes-em-eventos-congressos.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import { Participacao } from 'src/app/shared/services/objTypes'
import { ParticipationProps } from './types'

@Component({
  selector: 'app-outras-participacoes-em-eventos-congressos',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    // EventsWorkRankingComponent,
    // QualitativeEventsWorksComponent,
    QuantitativeOthersEventsComponent,
    AccordionComponent,
    QuantitativeSectionComponent
  ],
  templateUrl: './outras-participacoes-em-eventos-congressos.component.html',
  styleUrl: './outras-participacoes-em-eventos-congressos.component.css'
})
export class OutrasParticipacoesEmEventosCongressosComponent {
  curriculumns: ICurriculum[] = []
  participations: Participacao[] = []
  tableElements: ITableElements[] = [
    {
      title: 'Outras participações em eventos e congressos',
      property: 'outrasParticipacoesEmEventosCongressos'
    }
  ]

  participationProps: ParticipationProps[] = [
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
      key: 'ano',
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
      this.getParticipations()
    })
  }

  countOutrasParticipacoesEmEventos(curriculum: ICurriculum): number {
    return curriculum.curriculum.outrasParticipacoesEmEventosCongressos.length
  }

  getParticipations(): void {
    this.participations = this.curriculumns.reduce<Participacao[]>(
      (participations, curriculum) =>
        participations.concat(
          curriculum.curriculum.outrasParticipacoesEmEventosCongressos.map(
            (participation) => ({
              ano: participation.ano,
              nome: curriculum.curriculum.nome,
              lattesid: curriculum.lattesId,
              active: curriculum.active,
              serviceYears: curriculum.serviceYears
            })
          )
        ),
      []
    )
  }
}
