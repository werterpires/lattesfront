/* eslint-disable accessor-pairs */
import { Component, Input } from '@angular/core'
import { AccordionComponent } from '../accordion/accordion.component'
import {
  OutrasParticipacoesEmEventosCongressos,
  TrabalhoEmEventos
} from '../services/objTypes'
import { ICurriculum, ILattesCurriculum } from '../services/types'
import { UtilsService } from '../services/util.service'
import { NgIf } from '@angular/common'
import { Props } from './tpes'
import { FiltersService } from './filters.service'

@Component({
  selector: 'app-quantitative-section',
  standalone: true,
  imports: [AccordionComponent, NgIf],
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

  constructor(
    public utilsService: UtilsService,
    private readonly filtersService: FiltersService
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

  stringToLower(text: any): string {
    // If the given text is not a string, return an empty string
    if (typeof text !== 'string') {
      return ''
    }

    // Lowercase the text and remove single and double quotes
    return text.toLowerCase().replace(/['"]/g, '')
  }
}
