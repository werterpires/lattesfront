import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../shared/container/container.component';
import { CurriculumnsService } from '../shared/services/curriculumns.service';
import { ICurriculum } from '../shared/services/types';
import { NgFor } from '@angular/common';
import { AccordionComponent } from '../shared/accordion/accordion.component';
import { ProfessorsComponent } from '../professors/professors.component';
import { LattesSectionComponent } from '../lattes-section/lattes-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContainerComponent,
    AccordionComponent,
    ProfessorsComponent,
    LattesSectionComponent,
    NgFor,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  curriculumns: ICurriculum[] = [];
  constructor(private curriculumService: CurriculumnsService) {
    this.curriculumService.curriculumns$.subscribe((curriculumns) => {
      this.curriculumns = curriculumns;
    });
  }
}
