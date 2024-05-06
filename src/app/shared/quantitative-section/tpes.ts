import { FilterObject } from '../filter-input/types'
import {
  Editoracao,
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
  | keyof Editoracao
export interface Props {
  name: string
  key: SectionKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
