import { Component, Input } from '@angular/core';
import { ICurriculum } from '../../../shared/services/types';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FailDataPipe } from '../../../pipes/fail-data.pipe';
import { CurriculumnsService } from '../../../shared/services/curriculumns.service';
import { TrabalhoEmEventos } from '../../../shared/services/objTypes';
import { FormsModule } from '@angular/forms';
import { EventProps, EventsWorkKey } from '../types';
import { FilterInputComponent } from '../../../shared/filter-input/filter-input.component';
import { AccordionComponent } from '../../../shared/accordion/accordion.component';

@Component({
  selector: 'app-qualitative-events-works',
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
  templateUrl: './qualitative-events-works.component.html',
  styleUrl: './qualitative-events-works.component.css',
})
export class QualitativeEventsWorksComponent {
  _curriculumns: ICurriculum[] = [];
  @Input()
  set curriculumns(value: ICurriculum[]) {
    this._curriculumns = value;
    this.getEventsWorks();
    this.filterNow();
  }

  eventsWorks: TrabalhoEmEventos[] = [];
  eventsWorksToShow: TrabalhoEmEventos[] = [];
  atualPage: number = 1;
  resultsPerPage: number = 5;
  //arredondado pra cima
  pagesNumber: number = Math.ceil(
    this.eventsWorks.length / this.resultsPerPage
  );
  orderProp: string = 'nome';
  ascending: boolean = true;
  @Input() onlyActives: boolean = true;
  onlyServiceYears: boolean = false;

  @Input() title: string = 'Análise Qualitativa';

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
      width: '240px',
    },
    {
      name: 'Título do trabalho',
      key: 'tituloDoTrabalho',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '320px',
    },
    {
      name: 'Natureza',
      key: 'natureza',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '120px',
    },
    {
      name: 'Ano do trabalho',
      key: 'anoDoTrabalho',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '120px',
    },
    {
      name: 'País do evento',
      key: 'paisDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '120px',
    },

    {
      name: 'Idioma',
      key: 'idioma',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },
    {
      name: 'Meio de divulgacão',
      key: 'meioDeDivulgacao',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '120px',
    },
    {
      name: 'DOI',
      key: 'doi',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '120px',
    },
    {
      name: 'URL',
      key: 'homePageDoTrabalho',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '240px',
    },

    {
      name: 'Relevância?',
      key: 'flagRelevancia',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },

    {
      name: 'Título do trabalho em inglês',
      key: 'tituloDoTrabalhoIngles',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '240px',
    },

    {
      name: 'Divulgação científica?',
      key: 'flagDivulgacaoCientifica',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },

    {
      name: 'Nome do evento',
      key: 'nomeDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '240px',
    },

    {
      name: 'Classificação do evento',
      key: 'classificacaoDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '120px',
    },

    {
      name: 'Cidade do evento',
      key: 'cidadeDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '120px',
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
      width: '120px',
    },

    {
      name: 'Título dos anais ou proceedings',
      key: 'tituloDosAnaisOuProceedings',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '240px',
    },

    {
      name: 'Volume',
      key: 'volume',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },

    {
      name: 'Fasciculo',
      key: 'fasciculo',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },

    {
      name: 'Serie',
      key: 'serie',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },

    {
      name: 'Pagina inicial',
      key: 'paginaInicial',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },

    {
      name: 'Pagina final',
      key: 'paginaFinal',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },

    {
      name: 'ISBN',
      key: 'isbn',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '80px',
    },

    {
      name: 'Nome da editora',
      key: 'nomeDaEditora',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '160px',
    },

    {
      name: 'Cidade da editora',
      key: 'cidadeDaEditora',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '120px',
    },

    {
      name: 'Nome do evento em inglês',
      key: 'nomeDoEventoIngles',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true,
      },
      width: '240px',
    },
  ];

  constructor(private curriculumnsService: CurriculumnsService) {
    // if (this.curriculums.length === 0) {
    //   this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
    //     this.curriculums = curriculumns;
    //     this.getEventsWorks();
    //     this.filterNow();
    //   });
    // } else {
    //   this.getEventsWorks();
    //   this.filterNow();
    // }
  }

  getEventsWorks() {
    this.eventsWorks = [];
    this._curriculumns.forEach((curriculum) => {
      this.eventsWorks = [
        ...this.eventsWorks,
        ...curriculum.curriculum.trabalhosEmEventos.map((work) => {
          return {
            ...work,
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
    this.getWorksToShow();
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
        return work.serviceYears?.includes(
          work.anoDeRealizacao ? work.anoDeRealizacao : '?'
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

  getWorksToShow() {
    if (!this.resultsPerPage) {
      return;
    }
    this.pagesNumber = Math.ceil(this.eventsWorks.length / this.resultsPerPage);
    this.eventsWorksToShow = this.eventsWorks.filter((work) => {
      if (
        this.eventsWorks.indexOf(work) >=
          this.resultsPerPage * (this.atualPage - 1) &&
        this.eventsWorks.indexOf(work) < this.resultsPerPage * this.atualPage
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
