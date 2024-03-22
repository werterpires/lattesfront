import { Component, Input } from '@angular/core';
import { ICurriculum } from '../../shared/services/types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-professor-data',
  standalone: true,
  imports: [NgIf],
  templateUrl: './professor-data.component.html',
  styleUrl: './professor-data.component.css',
})
export class ProfessorDataComponent {
  @Input() Curriculums: ICurriculum[] = [];
}
