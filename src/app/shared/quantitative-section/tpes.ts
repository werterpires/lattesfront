import { FilterObject } from '../filter-input/types'
import {
  OutrasParticipacoesEmEventosCongressos,
  TrabalhoEmEventos
} from '../services/objTypes'

export type SectionKey =
  | keyof OutrasParticipacoesEmEventosCongressos
  | keyof TrabalhoEmEventos
export interface Props {
  name: string
  key: SectionKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
