import { FilterObject } from '../filter-input/types'
import {
  ApresentacaoDeTrabalho,
  Artigo,
  CursoDeCurtaDuracaoMinistrado,
  DesenvolvimentoDeMaterialDidaticoOuInstrucional,
  Editoracao,
  MidiaSocialWebsiteBlog,
  OrganizacaoDeEvento,
  OutraProducaoBibliografica,
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
  | keyof DesenvolvimentoDeMaterialDidaticoOuInstrucional
  | keyof CursoDeCurtaDuracaoMinistrado
  | keyof ApresentacaoDeTrabalho
  | keyof Artigo
  | keyof OutraProducaoBibliografica
export interface Props {
  name: string
  key: SectionKey
  showFilter: boolean
  ascending: boolean
  filterObject: FilterObject
  width: string
}
