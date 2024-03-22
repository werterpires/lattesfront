import { Component, Input } from '@angular/core';
import { CurriculumProp, currProp } from './types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { UtilsService } from '../../shared/services/util.service';
import { ICurriculum } from '../../shared/services/types';
import { EventsWorksService } from '../../shared/services/eventWorksService';
import { AccordionComponent } from '../../shared/accordion/accordion.component';

@Component({
  selector: 'app-quantitative-professors',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, AccordionComponent],
  templateUrl: './quantitative-professors.component.html',
  styleUrl: './quantitative-professors.component.css',
})
export class QuantitativeProfessorsComponent {
  @Input() curriculums: ICurriculum[] = [];
  sectionAscending = true;
  sectionFilter = false;
  quantityDesc = false;
  yersToConsider = this.utilsService.getLastFiveYears();
  onlyServiceYears = false;
  currProp: currProp[] = [
    {
      key: 'trabalhosEmEventos',
      name: 'Trabalhos em eventos',
    },
  ];

  constructor(
    public readonly utilsService: UtilsService,
    public readonly eventsWorksService: EventsWorksService
  ) {}

  countPropInCurriculum(prop: CurriculumProp) {
    return this.curriculums[0].curriculum[prop].length;
  }

  filterServiceYears() {
    if (!this.onlyServiceYears) {
      return;
    }
    this.yersToConsider = this.yersToConsider.filter((year) => {
      return this.curriculums[0].serviceYears.includes(year);
    });
  }
}
