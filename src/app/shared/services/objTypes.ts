interface dadosBasicosSecoes {
  lattesid?: string
  nome?: string
  active?: boolean
  serviceYears?: string
}

export interface TrabalhoEmEventos extends dadosBasicosSecoes {
  autores?: Autor[]
  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string[]
  informacoesAdicionais?: string
  sequenciaProducao?: string
  natureza?: 'COMPLETO' | 'RESUMO' | 'RESUMO_EXPANDIDO' | 'NAO_INFORMADO'
  tituloDoTrabalho?: string
  anoDoTrabalho?: string
  paisDoEvento?: string
  idioma?: string
  meioDeDivulgacao?:
    | 'IMPRESSO'
    | 'WEB'
    | 'MEIO_MAGNETICO'
    | 'MEIO_DIGITAL'
    | 'FILME'
    | 'HIPERTEXTO'
    | 'OUTRO'
    | 'VARIOS'
    | 'NAO_INFORMADO'
  homePageDoTrabalho?: string
  flagRelevancia?: 'SIM' | 'NAO'
  doi?: string
  tituloDoTrabalhoIngles?: string
  flagDivulgacaoCientifica?: 'SIM' | 'NAO'
  classificacaoDoEvento?:
    | 'INTERNACIONAL'
    | 'NACIONAL'
    | 'REGIONAL'
    | 'LOCAL'
    | 'NAO_INFORMADO'
  nomeDoEvento?: string
  cidadeDoEvento?: string
  anoDeRealizacao?: string
  tituloDosAnaisOuProceedings?: string
  volume?: string
  fasciculo?: string
  serie?: string
  paginaInicial?: string
  paginaFinal?: string
  isbn?: string
  nomeDaEditora?: string
  cidadeDaEditora?: string
  nomeDoEventoIngles?: string
}

export interface OutrasParticipacoesEmEventosCongressos
  extends dadosBasicosSecoes {
  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string
  informacoesAdicionais?: string
  sequenciaProducao?: string

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  tipoParticipacao?: string
  formaParticipacao?: string
  doi?: string
  tituloIngles?: string
  flagDivulgacaoCientifica?: string

  nomeDoEvento?: string
  codigoInstituicao?: string
  nomeInstituicao?: string
  localDoEvento?: string
  cidadeDoEvento?: string
  nomeDoEventoIngles?: string

  participanteDeEventosCongressos?: ParticipanteDeEventosCongressos[]
}

export interface ParticipacaoEmEncontros extends dadosBasicosSecoes {
  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string
  informacoesAdicionais?: string
  sequenciaProducao?: string

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  tipoParticipacao?: string
  formaParticipacao?: string
  doi?: string
  tituloIngles?: string
  flagDivulgacaoCientifica?: string

  nomeDoEvento?: string
  codigoInstituicao?: string
  nomeInstituicao?: string
  localDoEvento?: string
  cidadeDoEvento?: string
  nomeDoEventoIngles?: string

  participanteDeEventosCongressos?: ParticipanteDeEventosCongressos[]
}

export interface ParticipacaoEmSimposio extends dadosBasicosSecoes {
  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string
  informacoesAdicionais?: string
  sequenciaProducao?: string

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  tipoParticipacao?: string
  formaParticipacao?: string
  doi?: string
  tituloIngles?: string
  flagDivulgacaoCientifica?: string

  nomeDoEvento?: string
  codigoInstituicao?: string
  nomeInstituicao?: string
  localDoEvento?: string
  cidadeDoEvento?: string
  nomeDoEventoIngles?: string

  participanteDeEventosCongressos?: ParticipanteDeEventosCongressos[]
}

export interface ParticipacaoEmSeminario extends dadosBasicosSecoes {
  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string
  informacoesAdicionais?: string
  sequenciaProducao?: string

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  tipoParticipacao?: string
  formaParticipacao?: string
  doi?: string
  tituloIngles?: string
  flagDivulgacaoCientifica?: string

  nomeDoEvento?: string
  codigoInstituicao?: string
  nomeInstituicao?: string
  localDoEvento?: string
  cidadeDoEvento?: string
  nomeDoEventoIngles?: string

  participanteDeEventosCongressos?: ParticipanteDeEventosCongressos[]
}

export interface ParticipacaoEmCongresso extends dadosBasicosSecoes {
  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string
  informacoesAdicionais?: string
  sequenciaProducao?: string

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  tipoParticipacao?: string
  formaParticipacao?: string
  doi?: string
  tituloIngles?: string
  flagDivulgacaoCientifica?: string

  nomeDoEvento?: string
  codigoInstituicao?: string
  nomeInstituicao?: string
  localDoEvento?: string
  cidadeDoEvento?: string
  nomeDoEventoIngles?: string

  participanteDeEventosCongressos?: ParticipanteDeEventosCongressos[]
}

export interface OutraProducaoTecnica extends dadosBasicosSecoes {
  autores?: Autor[]
  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string[]
  informacoesAdicionais?: string
  sequenciaProducao?: string

  natureza?: string
  titulo: string
  ano: string
  pais: string
  meioDeDivulgacao: string
  idioma: string
  homePageDoTrabalho?: string
  flagRelevancia: boolean
  doi?: string
  tituloIngles?: string
  naturezaIngles?: string
  flagDivulgacaoCientifica: boolean

  finalidade?: string
  instituicaoPromotora?: string
  local?: string
  cidade?: string
  finalidadeIngles?: string
}

export interface MidiaSocialWebsiteBlog extends dadosBasicosSecoes {
  autores?: Autor[]
  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string[]
  informacoesAdicionais?: string
  sequenciaProducao?: string

  natureza: 'REDE_SOCIAL' | 'FORUM' | 'BLOG' | 'SITE'
  naturezaIngles?: string
  titulo: string
  tituloIngles?: string
  ano: string
  pais: string
  idioma: string
  homePage?: string
  flagRelevancia: boolean
  flagDivulgacaoCientifica: boolean

  tema?: string
}

export interface ProgramaDeRadioOuTV extends dadosBasicosSecoes {
  autores?: Autor[]
  palavrasChave?: string
  areasDoConhecimento?: string
  setoresDeAtividade?: string
  informacoesAdicionais?: string
  sequenciaProducao?: string

  natureza: string
  titulo: string
  ano: number
  pais: string
  idioma: string
  flagRelevancia: boolean
  doi?: string
  tituloIngles?: string
  homePage?: string
  meioDeDivulgacao: string
  flagDivulgacaoCientifica: boolean

  emissora?: string
  tema?: string
  formatoDataDaApresentacao: string
  dataDaApresentacao?: string
  duracaoEmMinutos?: number
  cidade?: string
  veiculoDeDivulgacao?: string
}

export interface ParticipanteDeEventosCongressos {
  nomeCompletoDoParticipanteDeEventosCongressos?: string
  nomeParaCitacaoDoParticipanteDeEventosCongressos?: string
  ordemParticipante?: string
  cpfDoParticipanteParticipanteDeEventosCongressos?: string
  nroIdCNPQ?: string
}

export interface Autor {
  nomeCompletoDoAutor?: string
  nomeParaCitacao?: string
  ordemDeAutoria?: string
  cpf?: string
  numeroIdCNPQ?: string
}

export interface AreasDoConhecimento {
  areaDoConhecimento1?: AreaDoConhecimento
  areaDoConhecimento2?: AreaDoConhecimento
  areaDoConhecimento3?: AreaDoConhecimento
}

interface AreaDoConhecimento {
  nomeGrandeAreaDoConhecimento?:
    | 'OUTROS'
    | 'LINGUISTICA_LETRAS_E_ARTES'
    | 'CIENCIAS_HUMANAS'
    | 'CIENCIAS_SOCIAIS_APLICADAS'
    | 'CIENCIAS_AGRARIAS'
    | 'CIENCIAS_DA_SAUDE'
    | 'ENGENHARIAS'
    | 'CIENCIAS_BIOLOGICAS'
    | 'CIENCIAS_EXATAS_E_DA_TERRA'
  nomeDaAreaDoConhecimento?: string
  nomeDaSubAreaDoConhecimento?: string
  nomeDaEspecialidade?: string
}
