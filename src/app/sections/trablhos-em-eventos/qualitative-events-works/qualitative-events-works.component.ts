import { Component, Input } from '@angular/core';
import { ICurriculum } from '../../../shared/services/types';
import { NgClass, NgFor } from '@angular/common';
import { FailDataPipe } from '../../../pipes/fail-data.pipe';
import { CurriculumnsService } from '../../../shared/services/curriculumns.service';
import { TrabalhoEmEventos } from '../../../shared/services/objTypes';
import { FormsModule } from '@angular/forms';
import { EventsWorkKey } from '../types';

@Component({
  selector: 'app-qualitative-events-works',
  standalone: true,
  imports: [NgFor, NgClass, FailDataPipe, FormsModule],
  templateUrl: './qualitative-events-works.component.html',
  styleUrl: './qualitative-events-works.component.css',
})
export class QualitativeEventsWorksComponent {
  curriculums: ICurriculum[] = [];
  eventsWorks: TrabalhoEmEventos[] = [];
  orderProp: string = 'nome';
  ascending: boolean = true;

  constructor(private curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns;
      this.getEventsWorks();
      this.orderNow();
    });
  }

  ngOnInit() {
    this.getEventsWorks();
  }

  getEventsWorks() {
    this.eventsWorks = [];
    this.curriculums.forEach((curriculum) => {
      this.eventsWorks = [
        ...this.eventsWorks,
        ...curriculum.curriculum.trabalhosEmEventos.map((work) => {
          return {
            ...work,
            nome: curriculum.curriculum.nome,
            lattesid: curriculum.lattesId,
          };
        }),
      ];
    });
    console.log(this.eventsWorks);
  }

  orderNow() {
    const propKey = this.orderProp as EventsWorkKey;

    this.eventsWorks.sort((a, b) => {
      const propA = a[propKey];
      const propB = b[propKey];
      if (propA === undefined || propB === undefined) {
        return 0;
      }

      let comparison = 0;
      if (propA < propB) {
        comparison = -1;
      } else if (propA > propB) {
        comparison = 1;
      }

      if (!this.ascending) {
        comparison *= -1;
      }

      return comparison;
    });
  }
}
