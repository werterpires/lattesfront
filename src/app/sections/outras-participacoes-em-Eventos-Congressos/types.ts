import { FilterObject } from '../../shared/filter-input/types'
import { OutrasParticipacoesEmEventosCongressos } from '../../shared/services/objTypes'

export type ParticipationsWorkKey = keyof OutrasParticipacoesEmEventosCongressos

export interface ParticipationProps {
  name: string
  key: ParticipationsWorkKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
