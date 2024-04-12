import { Component, Input } from '@angular/core'

import { type Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts'
import { type ChartSerie, type ChartData } from './types'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [NgxChartsModule, FormsModule],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.css',
  animations: []
})
export class QuantityComponent {
  @Input() multi: ChartSerie[] = []
  @Input() multi2: ChartSerie[] = []
  @Input() totals: ChartData[] = []
  @Input() totals2: ChartData[] = []
  @Input() multiTotal: ChartSerie[] = []

  // options
  showXAxis: boolean = true
  showYAxis: boolean = true

  showXAxisLabel: boolean = false
  showYAxisLabel: boolean = false

  xAxisLabel: string = 'Ano'
  xAxisLabel2: string = 'Professor'
  yAxisLabel: string = 'Número'

  gradient: boolean = false
  showLegend: boolean = true
  legendTitle: string = 'Professores'
  legendTitle2: string = 'Anos'
  legendPosition: LegendPosition = LegendPosition.Right

  scaleType: ScaleType = ScaleType.Ordinal

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: this.scaleType,
    domain: [
      '#003b71',
      '#ff6f61',
      '#6b5b95',
      '#feb236',
      '#d64161',
      '#465775',
      '#70a9a1',
      '#fad02e',
      '#ef476f',
      '#43aa8b',
      '#70a9a1',
      '#e9ecef',
      '#ffdb58',
      '#ff6b6b',
      '#70a9a1',
      '#ffbe76',
      '#686de0',
      '#303952',
      '#74b9ff',
      '#6ab04c'
    ]
  }

  @Input() graphTypes = {
    line: false,
    bar: true,
    pie: false
  }

  @Input() dataTypes = {
    year: false,
    professor: true
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)))
  }

  changeValuesAleatory(): void {
    this.multi.forEach((element) => {
      element.series.forEach((serie: any) => {
        serie.value = Math.floor(Math.random() * 100)
      })
    })
  }
}
