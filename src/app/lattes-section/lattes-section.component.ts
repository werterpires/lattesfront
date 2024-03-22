import { Component, Input } from '@angular/core';
import { ContainerComponent } from '../shared/container/container.component';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
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
  @Input() sectionsPage: boolean = true;
  sectionsToShow = this.sections;
  filterString: string = '';
  outlet: boolean = false;
  constructor(
    private curriculumService: CurriculumnsService,
    public router: Router
  ) {
    this.curriculumService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns;
    });
  }

  ngOnInit() {
    console.log(this.router.url.endsWith('/sections'), this.sectionsPage);
    if (this.router.url.endsWith('/sections') || !this.sectionsPage) {
      this.outlet = false;
    } else {
      this.outlet = true;
    }
  }

  filterObjects() {
    const filter = this.filterString.toLowerCase().split(' ');
    this.sectionsToShow = this.sections.filter((section) => {
      return filter.some((fil) => {
        return section.name.toLowerCase().includes(fil);
      });
    });
  }
}
