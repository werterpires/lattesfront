import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeOthersEventsComponent } from './quantitative-outras-participacoes-em-eventos-congressos/quantitative-outras-participacoes-em-eventos-congressos.component'

@Component({
  selector: 'app-outras-participacoes-em-eventos-congressos',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    // EventsWorkRankingComponent,
    // QualitativeEventsWorksComponent,
    QuantitativeOthersEventsComponent,
    AccordionComponent
  ],
  templateUrl: './outras-participacoes-em-eventos-congressos.component.html',
  styleUrl: './outras-participacoes-em-eventos-congressos.component.css'
})
export class OutrasParticipacoesEmEventosCongressosComponent {
  curriculumns: ICurriculum[] = []
  tableElements: ITableElements[] = [
    {
      title: 'Outras participações em eventos e congressos',
      property: 'outrasParticipacoesEmEventosCongressos'
    }
  ]

  constructor(private readonly curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculumns = curriculumns
    })
  }

  countOutrasParticipacoesEmEventos(curriculum: ICurriculum): number {
    return curriculum.curriculum.outrasParticipacoesEmEventosCongressos.length
  }
}
