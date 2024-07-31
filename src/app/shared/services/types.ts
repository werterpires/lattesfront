import {
  ApresentacaoDeTrabalho,
  Artigo,
  CapituloDeLivroPublicado,
  CursoDeCurtaDuracaoMinistrado,
  DesenvolvimentoDeMaterialDidaticoOuInstrucional,
  Editoracao,
  LivroPublicadoOuOrganizado,
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
  tags: ITag[]
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
  capitulosDeLivrosPublicados: CapituloDeLivroPublicado[]
  livrosPublicadosOuOrganizados: LivroPublicadoOuOrganizado[]
  artigosPublicados: Artigo[]
}

export interface ITag {
  _id: string
  tagName: string
  back?: string
  color?: string
}

export interface ICreateTag {
  tagName: string
}
