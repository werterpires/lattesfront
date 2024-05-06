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
  TextoEmJornalOuRevista,
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
  editoracoes: Editoracao[]
  artigosAceitosParaPublicacao: Artigo[]
  midiasSociaisWebsitesBlogs: MidiaSocialWebsiteBlog[]
  organizacoesDeEventos: OrganizacaoDeEvento[]
  outrasParticipacoesEmEventosCongressos: Participacao[]
  outrasProducoesTecnicas: OutraProducaoTecnica[]
  participacoesEmEncontros: Participacao[]
  participacoesEmSimposios: Participacao[]
  participacoesEmSeminarios: Participacao[]
  participacoesEmCongressos: Participacao[]
  programasDeRadioOuTV: ProgramaDeRadioOuTV[]
  trabalhosEmEventos: TrabalhoEmEventos[]
  desenvolvimentosDeMaterialDidaticoOuInstrucional: DesenvolvimentoDeMaterialDidaticoOuInstrucional[]
  cursosDeCurtaDuracaoMinistrados: CursoDeCurtaDuracaoMinistrado[]
  apresentacoesDeTrabalho: ApresentacaoDeTrabalho[]
  outrasProducoesBibliograficas: OutraProducaoBibliografica[]
  textosEmRevistasOuJornais: TextoEmJornalOuRevista[]
}
