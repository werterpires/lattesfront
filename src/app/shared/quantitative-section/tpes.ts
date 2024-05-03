import { FilterObject } from '../filter-input/types'
import {
  MidiaSocialWebsiteBlog,
  OrganizacaoDeEvento,
  OutraProducaoTecnica,
  Participacao,
  ProgramaDeRadioOuTV,
  TrabalhoEmEventos
} from '../services/objTypes'

export type SectionKey =
  | keyof Participacao
  | keyof TrabalhoEmEventos
  | keyof OutraProducaoTecnica
  | keyof MidiaSocialWebsiteBlog
  | keyof ProgramaDeRadioOuTV
  | keyof OrganizacaoDeEvento
export interface Props {
  name: string
  key: SectionKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
