import { Component, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-curriculums',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './add-curriculums.component.html',
  styleUrl: './add-curriculums.component.css',
})
export class AddCurriculumsComponent {
  @Output() closeEmitter = new EventEmitter();
}
