import { Component } from '@angular/core';
import { ContainerComponent } from '../shared/container/container.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CurriculumnsService } from '../shared/services/curriculumns.service';
import { ICurriculum } from '../shared/services/types';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-lattes-section',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterOutlet,
    NgIf,
    NgFor,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './lattes-section.component.html',
  styleUrl: './lattes-section.component.css',
})
export class LattesSectionComponent {
  curriculums: ICurriculum[] = [];
  sections: { name: string; route: string }[] = [
    { name: 'Trabalhos em eventos', route: 'eventsworks' },
    { name: 'Artigos', route: 'articles' },
  ];

  sectionsToShow = this.sections;
  constructor(private curriculumService: CurriculumnsService) {
    this.curriculumService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns;
    });
  }
}
