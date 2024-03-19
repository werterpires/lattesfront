import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TrabalhoEmEventos } from '../../../shared/services/objTypes';
import { EventProps, EventsWorkKey } from '../types';
import { ICurriculum } from '../../../shared/services/types';
import { QuantitativeEventsWorksComponent } from '../quantitative-events-works/quantitative-events-works.component';

@Component({
  selector: 'app-quantitative-events-row',
  standalone: true,
  imports: [NgFor],
  templateUrl: './quantitative-events-row.component.html',
  styleUrl: './quantitative-events-row.component.css',
})
export class QuantitativeEventsRowComponent {
  professorsToShow: string[] = [];
  professors: string[] = [];
  eventsWorks: TrabalhoEmEventos[] = [];

  @Input()
  set atualPage(value: number) {
    this._atualPage = value;
    this.getProfessorsToShow();
  }

  @Input()
  set resultsPerPage(value: number) {
    this._resultsPerPage = value;
    this.getProfessorsToShow();
  }

  @Input()
  set quantityDesc(value: boolean) {
    this._quantityDesc = value;
    this.getProfessorsToShow();
  }
  @Input()
  set orderProp(value: string) {
    this._orderProp = value;
    this.orderNow();
  }

  @Input()
  set curriculums(value: ICurriculum[]) {
    this._curriculums = value;
    this.getEventsWorks();
    this.filterNow();
  }

  @Input()
  set yersToConsider(value: string[]) {
    this._yersToConsider = value;
    this.getProfessorsToShow();
    this.filterNow();
  }

  @Input()
  set onlyActives(value: boolean) {
    this._onlyActives = value;
    this.filterNow();
  }

  @Input()
  set onlyServiceYears(value: boolean) {
    this._onlyServiceYears = value;
    this.filterNow();
  }

  @Input()
  set eventProps(value: EventProps[]) {
    this._eventProps = value;
    this.filterNow();
  }

  @Input() pagesNumber!: number;
  @Input() ascending: boolean = true;

  _resultsPerPage: number = 5;
  _atualPage: number = 1;
  _quantityDesc = true;
  _orderProp: string = 'nome';
  _curriculums: ICurriculum[] = [];
  _onlyActives: boolean = true;
  _onlyServiceYears: boolean = false;
  _yersToConsider: string[] = [];

  _eventProps: EventProps[] = [
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

  getProfessorsToShow() {
    if (!this._resultsPerPage) {
      return;
    }
    this.pagesNumber = Math.ceil(this.professors.length / this._resultsPerPage);
    this.professorsToShow = this.professors.filter((professor) => {
      if (
        this.professors.indexOf(professor) >=
          this._resultsPerPage * (this._atualPage - 1) &&
        this.professors.indexOf(professor) <
          this._resultsPerPage * this._atualPage
      ) {
        return true;
      }

      return false;
    });
  }

  getEventsWorks() {
    this.eventsWorks = [];
    this._curriculums.forEach((curriculum) => {
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

  countWorksByProfessorAndYear(professor: string, year: string) {
    return this.eventsWorks.filter((work) => {
      return work.anoDeRealizacao === year && work.nome === professor;
    }).length;
  }

  countWorksByProfessor(professor: string) {
    return this.eventsWorks.filter((work) => {
      return (
        (!work.anoDeRealizacao ||
          this._yersToConsider.includes(work.anoDeRealizacao)) &&
        work.nome === professor
      );
    }).length;
  }

  sortProfessorsByWorkQuantity() {
    this.professors.sort((a, b) => {
      const order =
        this.countWorksByProfessor(a) - this.countWorksByProfessor(b);

      if (this._quantityDesc) {
        return -order;
      } else {
        return order;
      }
    });
    this.getProfessorsToShow();
  }

  getProfessors() {
    this.professors = [];
    this.eventsWorks.forEach((work) => {
      if (
        work.nome &&
        !this.professors.includes(work.nome) &&
        (!work.anoDeRealizacao ||
          this._yersToConsider.includes(work.anoDeRealizacao))
      ) {
        this.professors.push(work.nome);
      }
    });
  }

  orderNow() {
    const propKey = this._orderProp as EventsWorkKey;

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

    for (const prop of this._eventProps) {
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

    if (this._onlyActives) {
      this.eventsWorks = this.eventsWorks.filter((work) => {
        return work.active;
      });
    }

    if (this._onlyServiceYears) {
      this.eventsWorks = this.eventsWorks.filter((work) => {
        return (
          work.serviceYears?.includes(
            work.anoDeRealizacao ? work.anoDeRealizacao : '?'
          ) &&
          this._yersToConsider.includes(
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
}
