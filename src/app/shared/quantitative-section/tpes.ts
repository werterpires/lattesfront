import { FilterObject } from '../filter-input/types'
import {
  OutraProducaoTecnica,
  Participacao,
  TrabalhoEmEventos
} from '../services/objTypes'

export type SectionKey =
  | keyof Participacao
  | keyof TrabalhoEmEventos
  | keyof OutraProducaoTecnica
export interface Props {
  name: string
  key: SectionKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
