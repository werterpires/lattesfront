import { Component, Input } from '@angular/core';
import { ICurriculum } from '../../../shared/services/types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FailDataPipe } from '../../../pipes/fail-data.pipe';
import { CurriculumnsService } from '../../../shared/services/curriculumns.service';
import { TrabalhoEmEventos } from '../../../shared/services/objTypes';
import { FormsModule } from '@angular/forms';
import { EventProps, EventsWorkKey } from '../types';
import { FilterInputComponent } from '../../../shared/filter-input/filter-input.component';
import { EventsWorksService } from '../../../shared/services/eventWorksService';
import { UtilsService } from '../../../shared/services/util.service';
import { AccordionComponent } from '../../../shared/accordion/accordion.component';

@Component({
  selector: 'app-quantitative-events-works',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    FailDataPipe,
    FormsModule,
    FilterInputComponent,
    AccordionComponent,
  ],
  templateUrl: './quantitative-events-works.component.html',
  styleUrl: './quantitative-events-works.component.css',
})
export class QuantitativeEventsWorksComponent {
  curriculums: ICurriculum[] = [];
  eventsWorks: TrabalhoEmEventos[] = [];
  professors: string[] = [];

  professorsToShow: string[] = [];

  atualPage: number = 1;
  resultsPerPage: number = 5;
  pagesNumber!: number;

  yersToConsider: string[] = this.utilsService.getLastFiveYears();

  orderProp: string = 'nome';
  ascending: boolean = true;

  onlyActives: boolean = true;
  onlyServiceYears: boolean = false;
  quantityDesc = true;

  eventProps: EventProps[] = [
    {
      name: 'Professor',
      key: 'nome',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '320px',
    },

    {
      name: 'Ano de realização',
      key: 'anoDeRealizacao',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '40px',
    },
  ];

  constructor(
    private curriculumnsService: CurriculumnsService,
    public readonly utilsService: UtilsService,
    public readonly eventsWorksService: EventsWorksService
  ) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns;
      this.getEventsWorks();
    });
  }

  /**
   * Filters the professors to show based on the current page and the
   * results per page. If results per page is 0, shows all professors.
   */
  getProfessorsToShow() {
    if (!this.resultsPerPage) {
      // If results per page is 0, show all professors
      return;
    }
    this.pagesNumber = Math.ceil(this.professors.length / this.resultsPerPage);

    // Calculate start and end based on current page and results per page
    const start = (this.atualPage - 1) * this.resultsPerPage;
    const end = start + this.resultsPerPage;
    // Slice the professors array with the calculated start and end indices
    this.professorsToShow = this.professors.slice(start, end);
  }

  /**
   * Populates the professors array with the names of professors who have
   * participated in events
   */
  getProfessors() {
    const professorsSet: Set<string> = new Set();

    for (const work of this.eventsWorks) {
      // If the professor's name is defined and the year of realization is
      // either undefined or inside yersToConsider
      if (
        work.nome &&
        (!work.anoDeRealizacao ||
          this.yersToConsider.includes(work.anoDeRealizacao))
      ) {
        // Add the professor's name to the professorsSet set
        professorsSet.add(work.nome);
      }
    }

    // Convert the set to an array and assign it to the professors property
    this.professors = Array.from(professorsSet);

    this.getProfessorsToShow();
  }

  /**
   * Reorders the events works based on the selected property and sort order.
   * The property is selected via the `orderProp` property and the order
   * is set by the `ascending` property.
   *
   * After reordering, the page number is reset to 1 and the professors to
   * be displayed are recalculated.
   */
  orderNow() {
    const propKey = this.orderProp as keyof TrabalhoEmEventos;

    this.eventsWorks.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? this.ascending
          ? -1
          : 1
        : this.ascending
        ? 1
        : -1
    );
    this.atualPage = 1;
    this.getProfessors();
  }

  /**
   * Filter the works based on the filters and the
   * other filters that can be applied.
   */
  filterNow() {
    // Filters with values applied
    const filters = this.eventProps.filter(
      (prop) => prop.filterObject.text.length > 0
    );
    // Values of the other filters
    const onlyActives = this.onlyActives;
    const onlyServiceYears = this.onlyServiceYears;
    const yersToConsider = this.yersToConsider;
    this.eventsWorks = this.eventsWorks.filter(
      (work) =>
        filters.every((prop) => {
          // Get the value of the property of the work
          const workValue = this.stringToLower(work[prop.key]);
          // Check if the value meets the filter
          if (prop.filterObject.disjunctive) {
            return prop.filterObject.text.some((text) =>
              workValue.includes(this.stringToLower(text))
            );
          } else {
            return prop.filterObject.text.every((text) =>
              workValue.includes(this.stringToLower(text))
            );
          }
        }) &&
        // Check if the work meets the "only actives" filter

        (!onlyActives || work.active) &&
        // Check if the work meets the "only service years" filter
        (!onlyServiceYears ||
          (work.serviceYears?.includes(work.anoDeRealizacao ?? '?') &&
            yersToConsider.includes(work.anoDeRealizacao ?? '?')))
    );

    // Order the works after filtering
    this.orderNow();
  }

  /**
   * Generates an array of events works from the curriculums.
   * Each event work is an object with the following properties:
   *   - anoDeRealizacao: the year the event was held
   *   - nome: the name of the curriculum
   *   - lattesid: the lattes id of the curriculum
   *   - active: whether the curriculum is active or not
   *   - serviceYears: the number of service years of the curriculum
   */
  getEventsWorks() {
    this.eventsWorks = this.curriculums.reduce(
      (eventsWorks, curriculum) =>
        eventsWorks.concat(
          curriculum.curriculum.trabalhosEmEventos.map((work) => ({
            anoDeRealizacao: work.anoDeRealizacao,
            nome: curriculum.curriculum.nome,
            lattesid: curriculum.lattesId,
            active: curriculum.active,
            serviceYears: curriculum.serviceYears,
          }))
        ),
      [] as TrabalhoEmEventos[]
    );
    this.filterNow();
  }

  /**
   * Sorts the professors by the quantity of works they participated in events.
   * The sorting is based on the quantity of works of each professor.
   */
  sortProfessorsByWorkQuantity() {
    // Maps each professor to the quantity of their works in events
    const worksByProfessor: Map<string, number> = new Map();
    this.eventsWorks.forEach((event) => {
      const professor = event.nome?.toString();
      if (professor) {
        const quantity = worksByProfessor.get(professor) || 0;
        worksByProfessor.set(professor, quantity + 1);
      }
    });

    // Sorts the professors by the quantity of works they participated in events
    this.professors.sort((a, b) => {
      return (worksByProfessor.get(b) || 0) - (worksByProfessor.get(a) || 0);
    });
    this.getProfessorsToShow();
  }

  /**
   * Cleans all the filters and reloads the data.
   */
  cleanFiltersData() {
    // Cleans all the filters' texts
    for (const prop of this.eventProps) {
      prop.filterObject.text.length = 0;
    }

    // Reloads the data from the curriculums
    this.getEventsWorks();
  }

  /**
   * Change the showFilter property of all eventProps, setting it to false
   * except for the one corresponding to the given key.
   */
  changeAllShowFilterToFalse(key: string) {
    const index = this.eventProps.findIndex((prop) => prop.key === key);
    this.eventProps.forEach((prop, i) => (prop.showFilter = i !== index));
  }

  /**
   * Lowercases a string and removes single and double quotes from it.
   * If the given text is not a string, an empty string is returned.
   */
  stringToLower(text: any): string {
    // If the given text is not a string, return an empty string
    if (typeof text !== 'string') {
      return '';
    }

    // Lowercase the text and remove single and double quotes
    return text.toLowerCase().replace(/['"]/g, '');
  }

  /**
   * Returns an array with the page numbers to be displayed.
   */
  getPageNumbers(): number[] {
    // Returns an array with the page numbers to be displayed. The length of
    // the array is equal to the number of pages (pagesNumber), and the values
    // are the page numbers, starting from 1.
    return Array.from({ length: this.pagesNumber }, (_, i) => i + 1);
  }
}
