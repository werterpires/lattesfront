import {
  MidiaSocialWebsiteBlog,
  OutraProducaoTecnica,
  Participacao,
  ProgramaDeRadioOuTV,
  TrabalhoEmEventos
} from './objTypes'

export interface ICurriculum {
  _id: string
  lattesId: string
  active: boolean
  serviceYears: string
  curriculum: ILattesCurriculum
  updatedDate: string
}

export interface ICreateCurriculums {
  curriculums: ICreateCurriculum[]
}

export interface ICreateCurriculum {
  lattesId: string
  active: boolean
  serviceYears: string
  curriculum: string
  updatedDate: string
}

export interface ILattesCurriculum {
  nome: string
  trabalhosEmEventos: TrabalhoEmEventos[]
  midiasSociaisWebsitesBlogs: MidiaSocialWebsiteBlog[]
  outrasParticipacoesEmEventosCongressos: Participacao[]
  outrasProducoesTecnicas: OutraProducaoTecnica[]
  participacoesEmEncontros: Participacao[]
  participacoesEmSimposios: Participacao[]
  participacoesEmSeminarios: Participacao[]
  participacoesEmCongressos: Participacao[]
  programasDeRadioOuTV: ProgramaDeRadioOuTV[]
}
