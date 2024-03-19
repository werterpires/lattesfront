import { Component } from '@angular/core';
import { ICurriculum } from '../../../shared/services/types';
import { Ranking } from './types';
import { CurriculumnsService } from '../../../shared/services/curriculumns.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-events-work-ranking',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './events-work-ranking.component.html',
  styleUrl: './events-work-ranking.component.css',
})
export class EventsWorkRankingComponent {
  curriculums: ICurriculum[] = [];
  totals: number[] = [];
  ranking: Ranking[] = [];

  constructor(private readonly curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns;
      this.getRanking();
    });
  }

  ngOnInit() {
    this.getRanking();
  }

  getRanking() {
    const ranking: Ranking[] = [];

    this.curriculums.forEach((curriculum) => {
      if (!curriculum.active) {
        return;
      }
      const worksInServiceYears =
        curriculum.curriculum.trabalhosEmEventos.filter((work) => {
          if (!work.anoDeRealizacao) {
            return false;
          }

          return curriculum.serviceYears.includes(work.anoDeRealizacao);
        });
      const quantity = worksInServiceYears.length;

      let publicationYearsAverage = 0;

      if (quantity) {
        publicationYearsAverage =
          worksInServiceYears.reduce((acc, work) => {
            return acc + parseInt(work.anoDeRealizacao || '0');
          }, 0) / worksInServiceYears.length;
      }

      const ServiceYearsQuantity = curriculum.serviceYears.split(' ').length;

      ranking.push({
        name: curriculum.curriculum.nome,
        quantity,
        publicationYearsAverage,
        ServiceYearsQuantity,
        total:
          quantity * 100 +
          publicationYearsAverage / 10000 +
          (0.5 / ServiceYearsQuantity) * 100,
      });
    });
    this.ranking = ranking.sort((a, b) => b.total - a.total);
    this.totals = [];
    ranking.forEach((r) => {
      if (!this.totals.includes(r.total)) {
        this.totals.push(r.total);
      }
    });

    this.totals.sort((a, b) => b - a);
    console.log(this.totals);
    console.log(ranking);
  }
}
