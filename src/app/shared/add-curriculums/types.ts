export interface IXml {
  '_NUMERO-IDENTIFICADOR': string
  '_DATA-ATUALIZACAO': string
  '_HORA-ATUALIZACAO': string
  'DADOS-GERAIS': {
    '_NOME-COMPLETO': string
  }
  'PRODUCAO-BIBLIOGRAFICA': {
    'TRABALHOS-EM-EVENTOS': {
      'TRABALHO-EM-EVENTOS_asArray': Array<{
        'TRABALHO-EM-EVENTOS_asArray': any[]
      }>
    }
  }
  'DADOS-COMPLEMENTARES': {
    'PARTICIPACAO-EM-EVENTOS-CONGRESSOS': {
      'OUTRAS-PARTICIPACOES-EM-EVENTOS-CONGRESSOS_asArray': any[]
      'PARTICIPACAO-EM-ENCONTRO_asArray': any[]
      'PARTICIPACAO-EM-SIMPOSIO_asArray': any[]
      'PARTICIPACAO-EM-SEMINARIO_asArray': any[]
      'PARTICIPACAO-EM-CONGRESSO_asArray': any[]
    }
  }
  'PRODUCAO-TECNICA': {
    'DEMAIS-TIPOS-DE-PRODUCAO-TECNICA': {
      'OUTRA-PRODUCAO-TECNICA_asArray': any[]
      'MIDIA-SOCIAL-WEBSITE-BLOG_asArray': any[]
    }
  }
}
