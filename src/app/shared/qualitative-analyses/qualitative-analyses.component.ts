import { Component, Input } from '@angular/core';
import { ICurriculum } from '../services/types';
import { ITableElements } from './types';

@Component({
  selector: 'app-qualitative-analyses',
  standalone: true,
  imports: [],
  templateUrl: './qualitative-analyses.component.html',
  styleUrl: './qualitative-analyses.component.css',
})
export class QualitativeAnalysesComponent {
  @Input() curriculums: ICurriculum[] = [];
  @Input() tableContents: ITableElements[] = [];
}
