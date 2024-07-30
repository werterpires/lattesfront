import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import { OrganizacaoDeEvento } from 'src/app/shared/services/objTypes'
import { QualitativeSectionComponent } from 'src/app/shared/qualitative-section/qualitative-section.component'
import { RankingSectionComponent } from 'src/app/shared/ranking-section/ranking-section.component'

import * as propsFiller from './props'
import { Props } from 'src/app/shared/quantitative-section/tpes'

@Component({
  selector: 'app-organizacao-de-eventos',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AccordionComponent,
    QuantitativeSectionComponent,
    QualitativeSectionComponent,
    RankingSectionComponent
  ],
  templateUrl: './organizacao-de-eventos.component.html',
  styleUrl: './organizacao-de-eventos.component.css'
})
export class OrganizacoesDeEventosComponent {
  curriculumns: ICurriculum[] = []
  sections: OrganizacaoDeEvento[] = []
  tableElements: ITableElements[] = [
    {
      title: 'Organizações de Eventos',
      property: 'organizacaoDeEventos'
    }
  ]

  professors: Array<{ name: string; serviceYears: string }> = []
  quantiProps: Props[] = propsFiller.quantitativeProps
  qualiProps: Props[] = propsFiller.qualitativeProps

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

  countSections(curriculum: ICurriculum): number {
    return curriculum.curriculum.organizacoesDeEventos.length
  }

  getWorks(): void {
    this.sections = this.curriculumns.reduce<OrganizacaoDeEvento[]>(
      (trabalhos, curriculum) =>
        trabalhos.concat(
          curriculum.curriculum.organizacoesDeEventos.map((section) => ({
            ...section,
            ano: section.ano,
            nome: curriculum.curriculum.nome,
            lattesid: curriculum.lattesId,
            active: curriculum.active,
            serviceYears: curriculum.serviceYears,
            tags: curriculum.tags
          }))
        ),
      []
    )
  }
}
