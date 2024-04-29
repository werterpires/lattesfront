import { Injectable } from '@angular/core'
import { Props } from './tpes'
import { Participacao, TrabalhoEmEventos } from '../services/objTypes'

@Injectable({ providedIn: 'root' })
export class FiltersService {
  filterNow(
    sectionProps: Props[],
    onlyActives: boolean,
    onlyServiceYears: boolean,
    yersToConsider: string[],
    sectionObjects: Participacao[] | TrabalhoEmEventos[] = [],
    sectionType: string
  ): Participacao[] | TrabalhoEmEventos[] {
    // Filters with values applied
    const filters = sectionProps.filter(
      (prop) => prop.filterObject.text.length > 0
    )
    // Values of the other filters

    sectionObjects = this.filterAny(
      sectionObjects,
      filters,
      onlyActives,
      onlyServiceYears,
      yersToConsider,
      sectionType
    )

    return sectionObjects

    // Order the works after filtering
    // this.orderNow()
  }

  filterAny(
    sectionObjects: Participacao[] | TrabalhoEmEventos[],
    filters: Props[],
    onlyActives: boolean,
    onlyServiceYears: boolean,
    yersToConsider: string[],
    sectionType: string
  ): Participacao[] | TrabalhoEmEventos[] {
    sectionObjects = this.filterParticipacoes(
      sectionObjects,
      filters,
      onlyActives,
      onlyServiceYears,
      yersToConsider
    )

    return sectionObjects
  }

  filterParticipacoes(
    sectionObjects: Participacao[],
    filters: Props[],
    onlyActives: boolean,
    onlyServiceYears: boolean,
    yersToConsider: string[]
  ): Participacao[] {
    sectionObjects = sectionObjects.filter((section) => {
      const sec = section

      return (
        (filters.every((prop) => {
          const key = prop.key as keyof Participacao
          // Get the value of the property of the work
          const workValue = this.stringToLower(sec[key])
          // Check if the value meets the filter
          if (prop.filterObject.disjunctive) {
            return prop.filterObject.text.some((text) =>
              workValue.includes(this.stringToLower(text))
            )
          } else {
            return prop.filterObject.text.every((text) =>
              workValue.includes(this.stringToLower(text))
            )
          }
        }) &&
          // Check if the work meets the "only actives" filter

          (!onlyActives || sec.active) &&
          // Check if the work meets the "only service years" filter
          (!onlyServiceYears ||
            (sec.serviceYears?.includes(sec.ano ?? '?') &&
              yersToConsider.includes(sec.ano ?? '?')))) ||
        false
      )
    })

    return sectionObjects
  }

  stringToLower(text: any): string {
    // If the given text is not a string, return an empty string
    if (typeof text !== 'string') {
      return ''
    }

    // Lowercase the text and remove single and double quotes
    return text.toLowerCase().replace(/['"]/g, '')
  }
}
