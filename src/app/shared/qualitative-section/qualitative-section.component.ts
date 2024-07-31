/* eslint-disable accessor-pairs */
import { Component, Input } from '@angular/core'
import { AccordionComponent } from '../accordion/accordion.component'
import { Props } from '../quantitative-section/tpes'
import { Participacao, TrabalhoEmEventos } from '../services/objTypes'
import { FormsModule } from '@angular/forms'
import { FiltersService } from '../quantitative-section/filters.service'
import { ILattesCurriculum } from '../services/types'
import { NgClass, NgFor, NgIf } from '@angular/common'
import { OrderService } from '../quantitative-section/order.service'
import { FilterInputComponent } from '../filter-input/filter-input.component'
import { TableService } from './table.service'
import { FailDataPipe } from 'src/app/pipes/fail-data.pipe'
import { ReportService } from './report.service'
import { UtilsService } from '../services/util.service'
import { TagsFilterComponent } from 'src/app/tags-filter/tags-filter.component'
import { ITagFilter } from 'src/app/tags-filter/types'

@Component({
  selector: 'app-qualitative-section',
  standalone: true,
  imports: [
    FailDataPipe,
    AccordionComponent,
    FilterInputComponent,
    TagsFilterComponent,
    FormsModule,
    NgFor,
    NgIf,

    NgClass
  ],
  templateUrl: './qualitative-section.component.html',
  styleUrl: './qualitative-section.component.css'
})
export class QualitativeSectionComponent {
  @Input() sectionProps!: Props[]

  _allSectionObjects: Participacao[] | TrabalhoEmEventos[] = []
  sectionObjects: Participacao[] | TrabalhoEmEventos[] = []
  sectionObjectsToShow: Participacao[] | TrabalhoEmEventos[] = []

  @Input() sectionType!: keyof ILattesCurriculum
  @Input() onlyActives: boolean = true
  @Input() author: string = 'autor'
  @Input() accordionTitle!: string
  onlyServiceYears: boolean = false

  tableContent: Array<Array<{ value: string; width: string }>> = []

  ascending: boolean = true
  orderProp: string = 'nome'
  atualPage: number = 1
  resultsPerPage: number = 5
  pagesNumber!: number
  tagsFilter: ITagFilter = { tagNames: [], disjunctive: true }

  constructor(
    public utilsService: UtilsService,
    private readonly filtersService: FiltersService,
    private readonly orderService: OrderService,
    private readonly tableService: TableService,
    private readonly reportService: ReportService
  ) {}

  @Input() set allSectionObjects(
    allSectionObjects: Participacao[] | TrabalhoEmEventos[]
  ) {
    this._allSectionObjects = allSectionObjects
    this.getSectionObjects()
  }

  cleanFiltersData(): void {
    for (const prop of this.sectionProps) {
      // Cleans the text of the filter
      prop.filterObject.text.length = 0
    }
    // Reloads the events works from the curriculums
    this.getSectionObjects()
    // Orders the events works based on the current order
    // this.orderNow()
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
      [],
      this.sectionObjects,
      this.sectionType,
      this.tagsFilter
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
    this.getSectionObjectsToShow()
  }

  getSectionObjectsToShow(): void {
    if (!this.resultsPerPage) {
      // If results per page is 0, show all events works
      this.sectionObjectsToShow = this.sectionObjects
      return
    }

    this.pagesNumber = Math.ceil(
      this.sectionObjects.length / this.resultsPerPage
    )

    const start = (this.atualPage - 1) * this.resultsPerPage
    const end = start + this.resultsPerPage

    // Slice the events works array with the calculated start and end indices
    this.sectionObjectsToShow = this.sectionObjects.slice(start, end)
    this.makeTableContent()
  }

  makeTableContent(): void {
    this.tableContent = this.tableService.makeTableContent(
      this.sectionObjectsToShow,
      this.sectionType,
      this.sectionProps
    )
  }

  async exportReport(): Promise<void> {
    await this.reportService.createSheet(
      this.sectionProps,
      this.sectionObjects,
      this.sectionType,
      this.author
    )
  }
}
