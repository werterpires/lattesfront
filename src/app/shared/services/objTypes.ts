interface dadosBasicosSecoes {
  lattesid?: string
  nome?: string
  active?: boolean
  serviceYears?: string
  ano?: string

  palavrasChave?: string[]
  areasDoConhecimento?: AreasDoConhecimento
  setoresDeAtividade?: string
  informacoesAdicionais?: string
  sequenciaProducao?: string
}

export interface TrabalhoEmEventos extends dadosBasicosSecoes {
  autores?: Autor[]

  natureza?: string
  tituloDoTrabalho?: string
  anoDoTrabalho?: string
  paisDoEvento?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  doi?: string
  tituloDoTrabalhoIngles?: string
  flagDivulgacaoCientifica?: string
  classificacaoDoEvento?: string
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

export interface Participacao extends dadosBasicosSecoes {
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

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  meioDeDivulgacao?: string
  idioma?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  doi?: string
  tituloIngles?: string
  naturezaIngles?: string
  flagDivulgacaoCientifica?: string

  finalidade?: string
  instituicaoPromotora?: string
  local?: string
  cidade?: string
  finalidadeIngles?: string
}

export interface MidiaSocialWebsiteBlog extends dadosBasicosSecoes {
  autores?: Autor[]

  natureza?: string
  naturezaIngles?: string
  titulo?: string
  tituloIngles?: string
  ano?: string
  pais?: string
  idioma?: string
  homePage?: string
  flagRelevancia?: string
  flagDivulgacaoCientifica?: string

  tema?: string
}

export interface ProgramaDeRadioOuTV extends dadosBasicosSecoes {
  autores?: Autor[]

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  flagRelevancia?: string
  doi?: string
  tituloIngles?: string
  homePage?: string
  meioDeDivulgacao?: string
  flagDivulgacaoCientifica?: string

  emissora?: string
  tema?: string
  formatoDataDaApresentacao?: string
  dataDaApresentacao?: string
  duracaoEmMinutos?: number
  cidade?: string
  veiculoDeDivulgacao?: string
}

export interface OrganizacaoDeEvento extends dadosBasicosSecoes {
  autores?: Autor[]

  tipo?: string
  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  doi?: string
  tituloIngles?: string
  flagDivulgacaoCientifica?: string

  instituicaoPromotora?: string
  duracaoEmSemanas?: number
  flagEventoItinerante?: string
  flagCatalogo?: string
  local?: string
  cidade?: string
}

export interface Editoracao extends dadosBasicosSecoes {
  autores?: Autor[]

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  doi?: string
  tituloIngles?: string

  numeroDePaginas?: number
  instituicaoPromotora?: string
  editora?: string
  cidade?: string
}

export interface DesenvolvimentoDeMaterialDidaticoOuInstrucional
  extends dadosBasicosSecoes {
  autores?: Autor[]

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  doi?: string
  tituloIngles?: string
  naturezaIngles?: string
  flagDivulgacaoCientifica?: string

  finalidade?: string
  finalidadeIngles?: string
}

export interface CursoDeCurtaDuracaoMinistrado extends dadosBasicosSecoes {
  autores?: Autor[]

  nivelDoCurso?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  doi?: string
  tituloIngles?: string
  flagDivulgacaoCientifica?: string

  participacaoDosAutores?: string
  instituicaoPromotoraDoCurso?: string
  localDoCurso?: string
  cidade?: string
  duracao?: string
  unidade?: string
  unidadeIngles?: string
}

export interface ApresentacaoDeTrabalho extends dadosBasicosSecoes {
  autores?: Autor[]

  natureza?: string
  titulo?: string
  ano?: string
  pais?: string
  idioma?: string
  flagRelevancia?: string
  doi?: string
  tituloIngles?: string
  flagDivulgacaoCientifica?: string

  nomeDoEvento?: string
  instituicaoPromotora?: string
  localDaApresentacao?: string
  cidadeDaApresentacao?: string
  nomeDoEventoIngles?: string
}

export interface OutraProducaoBibliografica extends dadosBasicosSecoes {
  autores?: Autor[]

  natureza?: string
  titulo?: string
  ano?: string
  paisDePublicacao?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: string
  doi?: string
  tituloIngles?: string
  naturezaIngles?: string
  flagDivulgacaoCientifica?: string

  editora?: string
  cidadeDaEditora?: string
  numeroDePaginas?: string
  issnIsbn?: string
}

export interface TextoEmJornalOuRevista extends dadosBasicosSecoes {
  autores?: Autor[]

  natureza?: 'JORNAL_DE_NOTICIAS' | 'REVISTA_MAGAZINE' | 'NAO_INFORMADO'
  tituloDoTexto?: string
  anoDoTexto?: string
  paisDePublicacao?: string
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
  tituloDoTextoIngles?: string
  flagDivulgacaoCientifica?: 'SIM' | 'NAO'

  tituloDoJornalOuRevista?: string
  issn?: string
  formatoDataDePublicacao?: 'DDMMAAAA'
  dataDePublicacao?: string
  volume?: string
  paginaInicial?: string
  paginaFinal?: string
  localDePublicacao?: string
}

export interface CapituloDeLivroPublicado extends dadosBasicosSecoes {
  autores?: Autor[]

  tipo?: string
  tituloDoCapituloDoLivro?: string
  ano?: string
  paisDePublicacao?: string
  idioma?: string
  meioDeDivulgacao?: string
  homePageDoTrabalho?: string
  flagRelevancia?: 'SIM' | 'NAO'
  doi?: string
  tituloDoCapituloDoLivroIngles?: string
  flagDivulgacaoCientifica?: 'SIM' | 'NAO'

  tituloDoLivro?: string
  numeroDeVolumes?: string
  paginaInicial?: string
  paginaFinal?: string
  isbn?: string
  organizadores?: string
  numeroDaEdicaoRevisao?: string
  numeroDaSerie?: string
  cidadeDaEditora?: string
  nomeDaEditora?: string
}

export interface LivroPublicadoOuOrganizado extends dadosBasicosSecoes {
  autores?: Autor[]

  tipo?: 'LIVRO_PUBLICADO' | 'LIVRO_ORGANIZADO_OU_EDICAO' | 'NAO_INFORMADO'
  natureza?:
    | 'COLETANEA'
    | 'TEXTO_INTEGRAL'
    | 'VERBETE'
    | 'ANAIS'
    | 'CATALOGO'
    | 'ENCICLOPEDIA'
    | 'LIVRO'
    | 'OUTRA'
    | 'PERIODICO'
    | 'NAO_INFORMADO'
  tituloDoLivro?: string
  ano?: string
  paisDePublicacao?: string
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
  tituloDoLivroIngles?: string
  flagDivulgacaoCientifica?: 'SIM' | 'NAO'

  numeroDeVolumes?: string
  numeroDePaginas?: string
  isbn?: string
  numeroDaEdicaoRevisao?: string
  numeroDaSerie?: string
  cidadeDaEditora?: string
  nomeDaEditora?: string
}

export interface Artigo extends dadosBasicosSecoes {
  autores?: Autor[]

  ordemImportancia?: string

  natureza?: 'COMPLETO' | 'RESUMO' | 'NAO_INFORMADO'
  tituloDoArtigo?: string
  anoDoArtigo?: string
  paisDePublicacao?: string
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
  tituloDoArtigoIngles?: string
  flagDivulgacaoCientifica?: 'SIM' | 'NAO'

  tituloDoPeriodicoOuRevista?: string
  issn?: string
  volume?: string
  fasciculo?: string
  serie?: string
  paginaInicial?: string
  paginaFinal?: string
  localDePublicacao?: string
}

// interface InformacoesAdicionais {
//   descricaoInformacoesAdicionais?: string
//   descricaoInformacoesAdicionaisIngles?: string
// }

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
