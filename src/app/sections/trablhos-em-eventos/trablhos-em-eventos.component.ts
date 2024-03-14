import { Component } from '@angular/core';
import { CurriculumnsService } from '../../shared/services/curriculumns.service';
import { ICurriculum } from '../../shared/services/types';
import { NgFor, NgIf } from '@angular/common';
import { QualitativeAnalysesComponent } from '../../shared/qualitative-analyses/qualitative-analyses.component';
import { ITableElements } from '../../shared/qualitative-analyses/types';
import { QualitativeEventsWorksComponent } from './qualitative-events-works/qualitative-events-works.component';
import { QuantitativeEventsWorksComponent } from './quantitative-events-works/quantitative-events-works.component';

@Component({
  selector: 'app-trablhos-em-eventos',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    QualitativeEventsWorksComponent,
    QuantitativeEventsWorksComponent,
  ],
  templateUrl: './trablhos-em-eventos.component.html',
  styleUrl: './trablhos-em-eventos.component.css',
})
export class TrablhosEmEventosComponent {
  curriculumns: ICurriculum[] = [];
  tableElements: ITableElements[] = [
    { title: 'Trabalhos em eventos', property: 'trabalhosEmEventos' },
  ];

  constructor(private curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculumns = curriculumns;
    });
  }

  countTrabalhosEmEventos(curriculum: ICurriculum): number {
    return curriculum.curriculum.trabalhosEmEventos.length;
  }
}
