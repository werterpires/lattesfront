/* eslint-disable accessor-pairs */
import { Component, Input } from '@angular/core'
import { AccordionComponent } from '../accordion/accordion.component'
import {
  OutrasParticipacoesEmEventosCongressos,
  TrabalhoEmEventos
} from '../services/objTypes'
import { ICurriculum, ILattesCurriculum } from '../services/types'
import { UtilsService } from '../services/util.service'
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common'
import { Props } from './tpes'
import { FiltersService } from './filters.service'
import { FormsModule } from '@angular/forms'
import { FilterInputComponent } from '../filter-input/filter-input.component'
import { OrderService } from './order.service'
import { ProfessorsService } from './professorsService'

@Component({
  selector: 'app-quantitative-section',
  standalone: true,
  imports: [
    AccordionComponent,
    NgIf,
    NgFor,
    NgStyle,
    NgClass,
    FormsModule,
    FilterInputComponent
  ],
  templateUrl: './quantitative-section.component.html',
  styleUrl: './quantitative-section.component.css'
})
export class QuantitativeSectionComponent {
  @Input() accordionTitle: string = ''
  @Input() sectionType!: keyof ILattesCurriculum
  @Input() _allSectionObjects:
    | OutrasParticipacoesEmEventosCongressos[]
    | TrabalhoEmEventos[] = []

  sectionObjects:
    | OutrasParticipacoesEmEventosCongressos[]
    | TrabalhoEmEventos[] = []

  @Input() sectionProps!: Props[]

  curriculums: ICurriculum[] = []
  professors: string[] = []
  professorsToShow: string[] = []

  yersToConsider: string[] = this.utilsService.getLastFiveYears()

  onlyActives: boolean = true
  onlyServiceYears: boolean = false

  info: boolean = false
  ascending: boolean = true
  orderProp: string = 'nome'

  quantityDesc = true

  graph = false

  atualPage: number = 1
  resultsPerPage: number = 8
  pagesNumber!: number

  constructor(
    public utilsService: UtilsService,
    private readonly filtersService: FiltersService,
    private readonly orderService: OrderService,
    private readonly professorsService: ProfessorsService
  ) {}

  @Input() set allSectionObjects(
    allSectionObjects:
      | OutrasParticipacoesEmEventosCongressos[]
      | TrabalhoEmEventos[]
  ) {
    this._allSectionObjects = allSectionObjects
    this.sectionObjects = allSectionObjects
    this.getSectionObjects()
  }

  getSectionObjects(): void {
    this.sectionObjects = this._allSectionObjects
    this.filterNow()
  }

  filterNow(): void {
    if (!this.sectionProps) {
      return
    }

    this.sectionObjects = this.filtersService.filterNow(
      this.sectionProps,
      this.onlyActives,
      this.onlyServiceYears,
      this.yersToConsider,
      this.sectionObjects,
      this.sectionType
    )
    this.orderNow()
  }

  orderNow(): void {
    this.orderService.orderNow(
      this.orderProp,
      this.sectionObjects,
      this.sectionType,
      this.ascending
    )
    this.atualPage = 1
    this.getProfessors()
  }

  getProfessors(): void {
    this.professors = this.professorsService.getProfessors(
      this.sectionObjects,
      this.professors,
      this.yersToConsider,
      this.sectionType
    )

    this.getProfessorsToShow()
  }

  getProfessorsToShow(): void {
    if (!this.resultsPerPage) {
      // If results per page is 0, show all professors
      return
    }
    this.pagesNumber = Math.ceil(this.professors.length / this.resultsPerPage)

    // Calculate start and end based on current page and results per page
    const start = (this.atualPage - 1) * this.resultsPerPage
    const end = start + this.resultsPerPage
    // Slice the professors array with the calculated start and end indices
    this.professorsToShow = this.professors.slice(start, end)

    // this.makeChartSerie()
  }

  sortProfessorsByParticipationQuantity(): void {
    this.orderService.sortProfessorsByParticipationQuantity(
      this.sectionType,
      this.professors,
      this.yersToConsider,
      this.sectionObjects,
      this.quantityDesc
    )

    console.log('professores', this.professors)
  }
}
