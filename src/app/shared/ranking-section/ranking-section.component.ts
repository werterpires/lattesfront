/* eslint-disable accessor-pairs */
import { Component, Input } from '@angular/core'
import { AccordionComponent } from '../accordion/accordion.component'
import { NgFor, NgIf } from '@angular/common'
import { Ranking } from './types'
import { Participacao, TrabalhoEmEventos } from '../services/objTypes'

@Component({
  selector: 'app-ranking-section',
  standalone: true,
  imports: [AccordionComponent, NgIf, NgFor],
  templateUrl: './ranking-section.component.html',
  styleUrl: './ranking-section.component.css'
})
export class RankingSectionComponent {
  totals: number[] = []
  ranking: Ranking[] = []
  _sectionObjects: Participacao[] | TrabalhoEmEventos[] = []
  @Input() professores: Array<{ name: string; serviceYears: string }> = []

  @Input() set sectionObjects(
    sectionObjects: Participacao[] | TrabalhoEmEventos[]
  ) {
    this._sectionObjects = sectionObjects
    this.getRanking()
  }

  ngOnInit(): void {
    this.getRanking()
  }

  getRanking(): void {
    const sections = this._sectionObjects.filter((section) => {
      return (
        section.active &&
        section.ano &&
        section.serviceYears?.includes(section.ano)
      )
    })

    this.ranking = []

    this.professores.forEach((professor) => {
      const professorSections = sections.filter((section) => {
        return section.nome === professor.name
      })

      const quantity = professorSections.length

      const yearSum = professorSections.reduce((acc, section) => {
        return acc + parseInt(section.ano || '0')
      }, 0)

      let publicationYearsAverage = 0
      if (quantity) {
        publicationYearsAverage = yearSum / quantity
      }

      const serviceYearsQuantity =
        professor.serviceYears?.split(' ').length || 100

      this.ranking.push({
        name: professor.name,
        quantity,
        publicationYearsAverage,
        serviceYearsQuantity,
        total:
          quantity * 100 +
          publicationYearsAverage / 10000 +
          (0.5 / serviceYearsQuantity) * 100
      })
    })

    this.ranking = this.ranking.sort((a, b) => b.total - a.total)
    this.totals = []
    this.ranking.forEach((r) => {
      if (!this.totals.includes(r.total)) {
        this.totals.push(r.total)
      }
    })

    this.totals.sort((a, b) => b - a)
  }
}
