/* eslint-disable accessor-pairs */
import { Component, Input } from '@angular/core'
import { AccordionComponent } from '../accordion/accordion.component'
import {
  OutrasParticipacoesEmEventosCongressos,
  TrabalhoEmEventos
} from '../services/objTypes'
import { ICurriculum, ILattesCurriculum } from '../services/types'
import { UtilsService } from '../services/util.service'
import { NgClass, NgIf, NgStyle } from '@angular/common'
import { Props } from './tpes'
import { FiltersService } from './filters.service'
import { FormsModule } from '@angular/forms'
import { FilterInputComponent } from '../filter-input/filter-input.component'
import { OrderService } from './order.service'

@Component({
  selector: 'app-quantitative-section',
  standalone: true,
  imports: [
    AccordionComponent,
    NgIf,
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

  yersToConsider: string[] = this.utilsService.getLastFiveYears()

  onlyActives: boolean = true
  onlyServiceYears: boolean = false

  info: boolean = false
  ascending: boolean = true
  orderProp: string = 'nome'

  graph = false

  atualPage: number = 1

  constructor(
    public utilsService: UtilsService,
    private readonly filtersService: FiltersService,
    private readonly orderService: OrderService
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
    // Filters with values applied
    this.sectionObjects = this.filtersService.filterNow(
      this.sectionProps,
      this.onlyActives,
      this.onlyServiceYears,
      this.yersToConsider,
      this.sectionObjects,
      this.sectionType
    )
  }

  orderNow(): void {
    this.orderService.orderNow(
      this.orderProp, this.sectionObjects, this.sectionType, this.ascending)
    this.atualPage = 1
  }

  stringToLower(text: any): string {
    // If the given text is not a string, return an empty string
    if (typeof text !== 'string') {
      return ''
    }

    // Lowercase the text and remove single and double quotes
    return text.toLowerCase().replace(/['"]/g, '')
  }
}
