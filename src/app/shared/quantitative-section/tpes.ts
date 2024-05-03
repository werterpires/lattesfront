import { FilterObject } from '../filter-input/types'
import {
  MidiaSocialWebsiteBlog,
  OutraProducaoTecnica,
  Participacao,
  TrabalhoEmEventos
} from '../services/objTypes'

export type SectionKey =
  | keyof Participacao
  | keyof TrabalhoEmEventos
  | keyof OutraProducaoTecnica
  | keyof MidiaSocialWebsiteBlog
export interface Props {
  name: string
  key: SectionKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
