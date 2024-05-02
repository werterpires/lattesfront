import { FilterObject } from '../../shared/filter-input/types'
import { Participacao } from '../../shared/services/objTypes'

export type ParticipationsWorkKey = keyof Participacao

export interface ParticipationProps {
  name: string
  key: ParticipationsWorkKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
