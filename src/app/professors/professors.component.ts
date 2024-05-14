import { Component, Input } from '@angular/core'
import { CurriculumnsService } from '../shared/services/curriculumns.service'
import { ICurriculum } from '../shared/services/types'
import { NavigationEnd, Router } from '@angular/router'
import { AccordionComponent } from '../shared/accordion/accordion.component'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { ContainerComponent } from '../shared/container/container.component'
import { filter } from 'rxjs/operators'
import { QuantitativeProfessorsComponent } from './quantitative-professors/quantitative-professors.component'
import { ProfessorDataComponent } from './professor-data/professor-data.component'
import { QualitativeSectionComponent } from '../shared/qualitative-section/qualitative-section.component'
import { Participacao, TrabalhoEmEventos } from '../shared/services/objTypes'
import * as eventProps from '../sections/trablhos-em-eventos/props'
import * as participationsProps from '../sections/outras-participacoes-em-Eventos-Congressos/props'
import { Props } from '../shared/quantitative-section/tpes'

@Component({
  selector: 'app-professors',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    ContainerComponent,
    AccordionComponent,
    QuantitativeProfessorsComponent,
    ProfessorDataComponent,
    QualitativeSectionComponent
  ],
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css'
})
export class ProfessorsComponent {
  curriculums: ICurriculum[] = []
  professorCurriculum: ICurriculum[] = []
  professorsToShow: ICurriculum[] = []
  filterString: string = ''
  onlyActives: boolean = false
  @Input() professorsPage: boolean = true
  @Input() head: boolean = true

  allProfessorSections: {
    trabalhosEmEventos: TrabalhoEmEventos[]
    outrasParticipacoesEmEventosCongressos: Participacao[]
  } = {
    trabalhosEmEventos: [],
    outrasParticipacoesEmEventosCongressos: []
  }

  eventsProps: Props[] = eventProps.eventProps
  workProps: Props[] = eventProps.workProps
  participationsQuantiProps: Props[] = participationsProps.participationProps
  participationsQualiProps: Props[] =
    participationsProps.participationQualyProps

  constructor(
    private readonly curriculumnsService: CurriculumnsService,
    private readonly router: Router
  ) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns
      this.filterCurriculums()
    })

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getProfessorCurriculum()
      })
  }

  ngAfterViewInit(): void {
    this.getProfessorCurriculum()
  }

  getProfessorCurriculum(): void {
    if (typeof window === 'undefined') {
      console.error('Window is not defined.')
      return
    }

    const url = window.location.href
    const parts = url.split('/')
    const professorId = parts.pop()

    if (!professorId) {
      return
    }

    this.professorCurriculum = this.curriculums.filter(
      (curriculum) => curriculum.lattesId === professorId
    )

    if (this.professorCurriculum.length === 0) {
      return
    }

    this.allProfessorSections.trabalhosEmEventos =
      this.professorCurriculum[0].curriculum.trabalhosEmEventos
    this.allProfessorSections.trabalhosEmEventos =
      this.allProfessorSections.trabalhosEmEventos.map((work) => ({
        ano: work.anoDeRealizacao,
        nome: this.professorCurriculum[0].curriculum.nome,
        lattesid: this.professorCurriculum[0].lattesId,
        active: this.professorCurriculum[0].active,
        serviceYears: this.professorCurriculum[0].serviceYears,
        ...work
      }))

    this.allProfessorSections.outrasParticipacoesEmEventosCongressos =
      this.professorCurriculum[0].curriculum.outrasParticipacoesEmEventosCongressos

    this.allProfessorSections.outrasParticipacoesEmEventosCongressos =
      this.allProfessorSections.outrasParticipacoesEmEventosCongressos.map(
        (participation) => ({
          ano: participation.ano,
          nome: this.professorCurriculum[0].curriculum.nome,
          lattesid: this.professorCurriculum[0].lattesId,
          active: this.professorCurriculum[0].active,
          serviceYears: this.professorCurriculum[0].serviceYears,
          ...participation
        })
      )
  }

  async navigateTo(url: string): Promise<void> {
    await this.router.navigate(['professors/' + url])
  }

  filterCurriculums(): void {
    const filters = this.filterString
      .toLowerCase()
      .split(' ')
      .map((filter) => filter.trim())

    this.professorsToShow = this.curriculums.filter((curriculum) => {
      return (
        (filters.some((filter) =>
          curriculum.curriculum.nome.toLowerCase().includes(filter)
        ) ||
          filters.some((filter) =>
            curriculum.lattesId.toLowerCase().includes(filter)
          ) ||
          filters.some((filter) =>
            curriculum.serviceYears.toLowerCase().includes(filter)
          )) &&
        (this.onlyActives ? curriculum.active : true)
      )
    })
  }
}
