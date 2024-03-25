import { Component, Input } from '@angular/core';
import { QualitativeEventsWorksComponent } from '../sections/trablhos-em-eventos/qualitative-events-works/qualitative-events-works.component';
import { CurriculumnsService } from '../shared/services/curriculumns.service';
import { ICurriculum } from '../shared/services/types';
import { NavigationEnd, Router } from '@angular/router';
import { AccordionComponent } from '../shared/accordion/accordion.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ContainerComponent } from '../shared/container/container.component';
import { filter } from 'rxjs/operators';
import { QuantitativeProfessorsComponent } from './quantitative-professors/quantitative-professors.component';
import { ProfessorDataComponent } from './professor-data/professor-data.component';

@Component({
  selector: 'app-professors',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    ContainerComponent,
    AccordionComponent,
    QualitativeEventsWorksComponent,
    QuantitativeProfessorsComponent,
    ProfessorDataComponent,
  ],
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css',
})
export class ProfessorsComponent {
  curriculums: ICurriculum[] = [];
  professorCurriculum: ICurriculum[] = [];
  professorsToShow: ICurriculum[] = [];
  filterString: string = '';
  onlyActives: boolean = false;
  @Input() professorsPage: boolean = true;
  constructor(
    private curriculumnsService: CurriculumnsService,
    private router: Router
  ) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns;
      this.filterCurriculums();
      this.getProfessorCurriculum();
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getProfessorCurriculum();
      });
  }

  getProfessorCurriculum() {
    const url = window.location.href;
    const parts = url.split('/');
    const professorId = parts.pop();

    if (professorId) {
      this.professorCurriculum = this.curriculums.filter(
        (curriculum) => curriculum.lattesId === professorId
      );
    }
  }

  navigateTo(url: string) {
    this.router.navigate(['professors/' + url]);
  }
  filterCurriculums() {
    const filters = this.filterString
      .toLowerCase()
      .split(' ')
      .map((filter) => filter.trim());
    this.professorsToShow = this.curriculums.filter((curriculum) => {
      return (
        (filters.some((filter) =>
          curriculum.curriculum.nome.toLowerCase().includes(filter)
        ) ||
          filters.some((filter) =>
            curriculum.lattesId.toLowerCase().includes(filter)
          ) ||
          filters.some((filter) =>
            curriculum.serviceYears.toLowerCase().includes(filter)
          )) &&
        (this.onlyActives ? curriculum.active : true)
      );
    });
  }
}
