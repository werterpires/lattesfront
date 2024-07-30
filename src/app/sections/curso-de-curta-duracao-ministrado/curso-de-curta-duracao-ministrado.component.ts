import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import { CursoDeCurtaDuracaoMinistrado } from 'src/app/shared/services/objTypes'
import { QualitativeSectionComponent } from 'src/app/shared/qualitative-section/qualitative-section.component'
import { RankingSectionComponent } from 'src/app/shared/ranking-section/ranking-section.component'

import * as propsFiller from './props'
import { Props } from 'src/app/shared/quantitative-section/tpes'

@Component({
  selector: 'app-curso-de-curta-duracao-ministrado',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AccordionComponent,
    QuantitativeSectionComponent,
    QualitativeSectionComponent,
    RankingSectionComponent
  ],
  templateUrl: './curso-de-curta-duracao-ministrado.component.html',
  styleUrl: './curso-de-curta-duracao-ministrado.component.css'
})
export class CursosDeCurtaDuracaoMinistradosComponent {
  curriculumns: ICurriculum[] = []
  sections: CursoDeCurtaDuracaoMinistrado[] = []
  tableElements: ITableElements[] = [
    {
      title: 'Curso de curta duração ministrado',
      property: 'cursoDeCurtaDuracaoMinistrado'
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
    return curriculum.curriculum.cursosDeCurtaDuracaoMinistrados.length
  }

  getWorks(): void {
    this.sections = this.curriculumns.reduce<CursoDeCurtaDuracaoMinistrado[]>(
      (trabalhos, curriculum) =>
        trabalhos.concat(
          curriculum.curriculum.cursosDeCurtaDuracaoMinistrados.map(
            (section) => ({
              ...section,
              ano: section.ano,
              nome: curriculum.curriculum.nome,
              lattesid: curriculum.lattesId,
              active: curriculum.active,
              serviceYears: curriculum.serviceYears,
              tags: curriculum.tags
            })
          )
        ),
      []
    )
  }
}
