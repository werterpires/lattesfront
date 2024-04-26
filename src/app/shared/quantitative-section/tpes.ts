import { FilterObject } from '../filter-input/types'
import { Participacao, TrabalhoEmEventos } from '../services/objTypes'

export type SectionKey = keyof Participacao | keyof TrabalhoEmEventos
export interface Props {
  name: string
  key: SectionKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
