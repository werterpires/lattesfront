import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import { LivroPublicadoOuOrganizado } from 'src/app/shared/services/objTypes'
import { QualitativeSectionComponent } from 'src/app/shared/qualitative-section/qualitative-section.component'
import { RankingSectionComponent } from 'src/app/shared/ranking-section/ranking-section.component'

import * as propsFiller from './props'
import { Props } from 'src/app/shared/quantitative-section/tpes'

@Component({
  selector: 'app-livros-publicados-ou-organizados',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AccordionComponent,
    QuantitativeSectionComponent,
    QualitativeSectionComponent,
    RankingSectionComponent
  ],
  templateUrl: './livros-publicados-ou-organizados.component.html',
  styleUrl: './livros-publicados-ou-organizados.component.css'
})
export class LivrosPublicadosOuOrganizadosComponent {
  curriculumns: ICurriculum[] = []
  sections: LivroPublicadoOuOrganizado[] = []
  tableElements: ITableElements[] = [
    {
      title: 'Capítulos de livros publicados',
      property: 'capitulosDeLivrosPublicados'
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
    return curriculum.curriculum.livrosPublicadosOuOrganizados.length
  }

  getWorks(): void {
    this.sections = this.curriculumns.reduce<LivroPublicadoOuOrganizado[]>(
      (trabalhos, curriculum) =>
        trabalhos.concat(
          curriculum.curriculum.livrosPublicadosOuOrganizados.map(
            (section) => ({
              ...section,
              ano: section.ano,
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
