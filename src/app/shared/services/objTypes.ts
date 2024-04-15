interface dadosBaiscosSecoes {
  lattesid?: string
  nome?: string
  active?: boolean
  serviceYears?: string
}

export interface TrabalhoEmEventos extends dadosBaiscosSecoes {
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
  extends dadosBaiscosSecoes {
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

export interface ParticipacaoEmEncontros extends dadosBaiscosSecoes {
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

export interface ParticipacaoEmSimposio extends dadosBaiscosSecoes {
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

export interface ParticipacaoEmSeminario extends dadosBaiscosSecoes {
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

export interface ParticipacaoEmCongresso extends dadosBaiscosSecoes {
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

export interface ParticipanteDeEventosCongressos {
  nomeCompletoDoParticipanteDeEventosCongressos?: string
  nomeParaCitacaoDoParticipanteDeEventosCongressos?: string
  ordemParticipante?: string
  cpfDoParticipanteParticipanteDeEventosCongressos?: string
  nroIdCNPQ?: string
}

interface Autor {
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
