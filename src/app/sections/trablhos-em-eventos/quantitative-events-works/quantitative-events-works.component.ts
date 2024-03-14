import { Component, Input } from '@angular/core';
import { ICurriculum } from '../../../shared/services/types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FailDataPipe } from '../../../pipes/fail-data.pipe';
import { CurriculumnsService } from '../../../shared/services/curriculumns.service';
import { TrabalhoEmEventos } from '../../../shared/services/objTypes';
import { FormsModule } from '@angular/forms';
import { EventProps, EventsWorkKey } from '../types';
import { FilterInputComponent } from '../../../shared/filter-input/filter-input.component';

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
  yersToConsider: string[] = this.getLastFiveYears();

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
    },
  ];

  constructor(private curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns;
      this.getEventsWorks();
      this.filterNow();
    });
  }

  sortProfessorsByWorkQuantity() {
    this.professors.sort((a, b) => {
      const order =
        this.countWorksByProfessor(a) - this.countWorksByProfessor(b);

      if (this.quantityDesc) {
        return -order;
      } else {
        return order;
      }
    });
    this.getProfessorsToShow();
  }

  getLastFiveYears() {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = [];
    for (let i = 0; i < 5; i++) {
      lastFiveYears.unshift((currentYear - i).toString());
    }
    return lastFiveYears;
  }

  getProfessors() {
    this.professors = [];
    this.eventsWorks.forEach((work) => {
      if (
        work.nome &&
        !this.professors.includes(work.nome) &&
        (!work.anoDeRealizacao ||
          this.yersToConsider.includes(work.anoDeRealizacao))
      ) {
        this.professors.push(work.nome);
      }
    });
  }

  getEventsWorks() {
    this.eventsWorks = [];
    this.curriculums.forEach((curriculum) => {
      this.eventsWorks = [
        ...this.eventsWorks,
        ...curriculum.curriculum.trabalhosEmEventos.map((work) => {
          return {
            anoDeRealizacao: work.anoDeRealizacao,
            nome: curriculum.curriculum.nome,
            lattesid: curriculum.lattesId,
            active: curriculum.active,
            serviceYears: curriculum.serviceYears,
          };
        }),
      ];
    });
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
    this.atualPage = 1;
    this.getProfessors();
    this.getProfessorsToShow();
  }

  filterNow() {
    this.getEventsWorks();

    for (const prop of this.eventProps) {
      if (prop.filterObject.text.length === 0) {
        continue;
      }
      if (prop.filterObject.disjunctive) {
        this.eventsWorks = this.eventsWorks.filter((work) => {
          const workValue = this.stringToLower(work[prop.key]);
          for (const text of prop.filterObject.text) {
            if (workValue.includes(this.stringToLower(text))) {
              return true;
            }
          }
          return false;
        });
      } else {
        this.eventsWorks = this.eventsWorks.filter((work) => {
          const workValue = this.stringToLower(work[prop.key]);
          return prop.filterObject.text.every((text) =>
            workValue.includes(this.stringToLower(text))
          );
        });
      }
    }

    if (this.onlyActives) {
      this.eventsWorks = this.eventsWorks.filter((work) => {
        return work.active;
      });
    }

    if (this.onlyServiceYears) {
      this.eventsWorks = this.eventsWorks.filter((work) => {
        return (
          work.serviceYears?.includes(
            work.anoDeRealizacao ? work.anoDeRealizacao : '?'
          ) &&
          this.yersToConsider.includes(
            work.anoDeRealizacao ? work.anoDeRealizacao : '?'
          )
        );
      });
    }

    this.orderNow();
  }

  stringToLower(text: any) {
    if (typeof text !== 'string') {
      return '';
    }
    text = text.replace(/['"]/g, '');
    return text.toLowerCase();
  }

  getYears(text: string) {
    let newText: string[] = [];

    const regexIntervalo = /\b(\d+)-(\d+)\b/g;

    text = text.replace(regexIntervalo, (match, inicio, fim) => {
      const inicioNum = parseInt(inicio);
      const fimNum = parseInt(fim);
      if (
        !isNaN(inicioNum) &&
        !isNaN(fimNum) &&
        fimNum > inicioNum &&
        fimNum - inicioNum <= 50
      ) {
        for (let i = inicioNum; i <= fimNum; i++) {
          newText.push(i.toString());
        }
        return '';
      } else {
        return match;
      }
    });

    const trechosRestantes = text
      .split(/\s+/)
      .filter((trecho) => trecho.trim());
    newText.push(...trechosRestantes);

    //eliminar repetidos e tudo que não puder ser transformado em number
    newText = [...new Set(newText)].filter((text) => {
      const number = parseInt(text);
      return !isNaN(number);
    });

    this.yersToConsider = newText.sort();
    this.filterNow();
  }

  countWorksByProfessorAndYear(professor: string, year: string) {
    return this.eventsWorks.filter((work) => {
      return work.anoDeRealizacao === year && work.nome === professor;
    }).length;
  }

  countWorksByProfessor(professor: string) {
    return this.eventsWorks.filter((work) => {
      return (
        (!work.anoDeRealizacao ||
          this.yersToConsider.includes(work.anoDeRealizacao)) &&
        work.nome === professor
      );
    }).length;
  }

  changeAllShowFilterToFalse(key: string) {
    const oneProp = key as EventsWorkKey;
    for (const prop of this.eventProps) {
      if (prop.key !== oneProp) {
        prop.showFilter = false;
      }
    }
  }

  cleanFiltersData() {
    for (const prop of this.eventProps) {
      prop.filterObject.text = [];
    }

    this.getEventsWorks();
    this.orderNow();
  }

  getProfessorsToShow() {
    if (!this.resultsPerPage) {
      return;
    }
    this.pagesNumber = Math.ceil(this.professors.length / this.resultsPerPage);
    this.professorsToShow = this.professors.filter((professor) => {
      if (
        this.professors.indexOf(professor) >=
          this.resultsPerPage * (this.atualPage - 1) &&
        this.professors.indexOf(professor) <
          this.resultsPerPage * this.atualPage
      ) {
        return true;
      }

      return false;
    });
  }

  getPageNumbers(): number[] {
    return Array(this.pagesNumber)
      .fill(0)
      .map((_, index) => index + 1);
  }
}
