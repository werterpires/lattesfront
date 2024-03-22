import { Component } from '@angular/core';
import { QualitativeEventsWorksComponent } from '../sections/trablhos-em-eventos/qualitative-events-works/qualitative-events-works.component';
import { CurriculumnsService } from '../shared/services/curriculumns.service';
import { ICurriculum } from '../shared/services/types';
import { NavigationEnd, Router } from '@angular/router';
import { AccordionComponent } from '../shared/accordion/accordion.component';
import { NgFor, NgIf } from '@angular/common';
import { ContainerComponent } from '../shared/container/container.component';
import { filter } from 'rxjs/operators';
import { QuantitativeProfessorsComponent } from './quantitative-professors/quantitative-professors.component';

@Component({
  selector: 'app-professors',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ContainerComponent,
    AccordionComponent,
    QualitativeEventsWorksComponent,
    QuantitativeProfessorsComponent,
  ],
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css',
})
export class ProfessorsComponent {
  curriculums: ICurriculum[] = [];
  professorCurriculum: ICurriculum[] = [];
  constructor(
    private curriculumnsService: CurriculumnsService,
    private router: Router
  ) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns;

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
}
