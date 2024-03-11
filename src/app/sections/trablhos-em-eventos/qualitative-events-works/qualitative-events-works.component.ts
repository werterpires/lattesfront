import { Component, Input } from '@angular/core';
import { ICurriculum } from '../../../shared/services/types';
import { NgFor } from '@angular/common';
import { FailDataPipe } from '../../../pipes/fail-data.pipe';
import { CurriculumnsService } from '../../../shared/services/curriculumns.service';

@Component({
  selector: 'app-qualitative-events-works',
  standalone: true,
  imports: [NgFor, FailDataPipe],
  templateUrl: './qualitative-events-works.component.html',
  styleUrl: './qualitative-events-works.component.css',
})
export class QualitativeEventsWorksComponent {
  curriculums: ICurriculum[] = [];

  constructor(private curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = [...curriculumns];
    });
  }
}
