import { Component, EventEmitter, Output } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-charts-controls',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './charts-controls.component.html',
  styleUrl: './charts-controls.component.css'
})
export class ChartsControlsComponent {
  @Output() dataTypesEmitter = new EventEmitter<string>()
  @Output() chartTypesEmitter = new EventEmitter<string>()

  dataType = 'professor'
  chartType = 'bar'
}
