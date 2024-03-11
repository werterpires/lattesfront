import { Component } from '@angular/core';
import { CurriculumnsService } from '../../shared/services/curriculumns.service';
import { ICurriculum } from '../../shared/services/types';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-trablhos-em-eventos',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './trablhos-em-eventos.component.html',
  styleUrl: './trablhos-em-eventos.component.css',
})
export class TrablhosEmEventosComponent {
  curriculumns: ICurriculum[] = [];

  constructor(private curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculumns = curriculumns;
    });
  }

  countTrabalhosEmEventos(curriculum: ICurriculum): number {
    return curriculum.curriculum.trabalhosEmEventos.length;
  }
}
