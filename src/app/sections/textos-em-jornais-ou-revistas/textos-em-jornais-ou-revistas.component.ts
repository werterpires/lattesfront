import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import {
  Artigo,
  TextoEmJornalOuRevista
} from 'src/app/shared/services/objTypes'
import { QualitativeSectionComponent } from 'src/app/shared/qualitative-section/qualitative-section.component'
import { RankingSectionComponent } from 'src/app/shared/ranking-section/ranking-section.component'

import * as propsFiller from './props'
import { Props } from 'src/app/shared/quantitative-section/tpes'

@Component({
  selector: 'app-textos-em-jornais-ou-revistas',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AccordionComponent,
    QuantitativeSectionComponent,
    QualitativeSectionComponent,
    RankingSectionComponent
  ],
  templateUrl: './textos-em-jornais-ou-revistas.component.html',
  styleUrl: './textos-em-jornais-ou-revistas.component.css'
})
export class TextosEmJornaisOuRevistasComponent {
  curriculumns: ICurriculum[] = []
  sections: Artigo[] = []
  tableElements: ITableElements[] = [
    {
      title: 'Textos em jornais ou revistas',
      property: 'textosEmJornaisOuRevistas'
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
    return curriculum.curriculum.textosEmRevistasOuJornais.length
  }

  getWorks(): void {
    this.sections = this.curriculumns.reduce<TextoEmJornalOuRevista[]>(
      (trabalhos, curriculum) =>
        trabalhos.concat(
          curriculum.curriculum.textosEmRevistasOuJornais.map((section) => ({
            ...section,
            ano: section.anoDoTexto,
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
