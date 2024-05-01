import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import { TrabalhoEmEventos } from 'src/app/shared/services/objTypes'
import { QualitativeSectionComponent } from 'src/app/shared/qualitative-section/qualitative-section.component'
import { RankingSectionComponent } from 'src/app/shared/ranking-section/ranking-section.component'

import * as eventPropsFiller from './props'
import { Props } from 'src/app/shared/quantitative-section/tpes'

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

  eventProps: Props[] = eventPropsFiller.eventProps
  workProps: Props[] = eventPropsFiller.workProps

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
