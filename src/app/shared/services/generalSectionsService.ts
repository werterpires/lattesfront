/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import {
  DadosGeraisArrays,
  DemaisTiposDeProducaoBibliograficaArrays,
  DemaisTiposDeProducaoTecnicaArrays,
  FormacoesComplementaresArrays,
  TrabalhoEmEventos,
  GeneralSections,
  ParticipacoesEmBancaTrabalhosConclusaoArrays
} from './objTypes'
import { UtilsService } from './util.service'
import { IXml } from '../add-curriculums/types'

@Injectable({
  providedIn: 'root'
})
export class GeneralSectionsService {
  constructor(private readonly utilsService: UtilsService) {}

  makeGeneralSections(data: IXml): GeneralSections {
    const dadosGerais = data['DADOS-GERAIS']
    const demaisTiposDeProducaoBibliografica =
      data['PRODUCAO-BIBLIOGRAFICA']['DEMAIS-TIPOS-DE-PRODUCAO-BIBLIOGRAFICA']

    const dadosGeraisSubData = this.getDadosGerais(dadosGerais)
    const demaisTiposDeProducaoBibliograficaSubData =
      this.getDemaisTiposDeProducaoBibliografica(
        demaisTiposDeProducaoBibliografica
      )
    const demaisTiposDeProducaoTecnicaSubData =
      this.getDemaisTiposDeProducaoTecnica(
        data['PRODUCAO-TECNICA']['DEMAIS-TIPOS-DE-PRODUCAO-TECNICA']
      )
    const formacoesComplementaresSubData = this.getFormacaoComplementar(
      data['DADOS-COMPLEMENTARES']['FORMACAO-COMPLEMENTAR']
    )
    const participacoesEmBancaTrabalhosConclusaoSubData =
      this.getParticipacoesEmBancaTrabalhosConclusao(
        data['DADOS-COMPLEMENTARES'][
          'PARTICIPACAO-EM-BANCA-TRABALHOS-CONCLUSAO'
        ]
      )

    console.log(
      'data s',
      data['DADOS-COMPLEMENTARES']['PARTICIPACAO-EM-BANCA-TRABALHOS-CONCLUSAO']
    )
    console.log(
      'participacoesEmBancaTrabalhosConclusaoSubData',
      participacoesEmBancaTrabalhosConclusaoSubData
    )

    const generalSections: GeneralSections = {
      ...dadosGeraisSubData,
      ...demaisTiposDeProducaoBibliograficaSubData,
      ...demaisTiposDeProducaoTecnicaSubData,
      ...formacoesComplementaresSubData,
      ...participacoesEmBancaTrabalhosConclusaoSubData
    }

    return generalSections
  }

  getDemaisTiposDeProducaoBibliografica(
    demaisTiposDeProducaoBibliografica: any
  ): DemaisTiposDeProducaoBibliograficaArrays {
    const demaisTiposDeProducaoBibliograficaArrays: DemaisTiposDeProducaoBibliograficaArrays =
      {
        outrasProducoesBibliograficas: [],
        partiturasMusicais: [],
        prefaciosPosfacios: []
      }

    if (!demaisTiposDeProducaoBibliografica) {
      return demaisTiposDeProducaoBibliograficaArrays
    }

    const outrasProducoesBibliograficasArray =
      demaisTiposDeProducaoBibliografica['OUTRA-PRODUCAO-BIBLIOGRAFICA_asArray']
    const partiturasMusicaisArray =
      demaisTiposDeProducaoBibliografica['PARTITURA-MUSICAL_asArray']
    const prefaciosPosfaciosArray =
      demaisTiposDeProducaoBibliografica['PREFACIO-POSFACIO_asArray']

    if (
      outrasProducoesBibliograficasArray &&
      outrasProducoesBibliograficasArray.length > 0
    ) {
      demaisTiposDeProducaoBibliograficaArrays.outrasProducoesBibliograficas =
        outrasProducoesBibliograficasArray.map((item: any) => {
          return {
            ano: item['DADOS-BASICOS-DE-OUTRA-PRODUCAO']._ANO
          }
        })
    }

    if (partiturasMusicaisArray && partiturasMusicaisArray.length > 0) {
      demaisTiposDeProducaoBibliograficaArrays.partiturasMusicais =
        partiturasMusicaisArray.map((item: any) => {
          return {
            ano: item['DADOS-BASICOS-DA-PARTITURA']._ANO
          }
        })
    }

    if (prefaciosPosfaciosArray && prefaciosPosfaciosArray.length > 0) {
      demaisTiposDeProducaoBibliograficaArrays.prefaciosPosfacios =
        prefaciosPosfaciosArray.map((item: any) => {
          return {
            ano: item['DADOS-BASICOS-DO-PREFACIO-POSFACIO']._ANO
          }
        })
    }

    return demaisTiposDeProducaoBibliograficaArrays
  }

  getDadosGerais(dadosGerais: any): DadosGeraisArrays {
    const dadosGeraisArrays: DadosGeraisArrays = {
      graduacoes: [],
      especializacoes: [],
      mestrados: [],
      doutorados: [],
      posDoutorados: [],
      livresDocencias: [],
      cursosTecnicosProfissionalizantes: [],
      mestradosProfissionalizantes: [],
      ensinosFundamentaisPrimeiroGrau: [],
      ensinosMediosSegundoGrau: [],
      residenciasMedicas: [],
      aperfeicoamentos: []
    }

    if (!dadosGerais) {
      return dadosGeraisArrays
    }
    const formacaoAcademica = dadosGerais['FORMACAO-ACADEMICA-TITULACAO']

    if (!formacaoAcademica) {
      return dadosGeraisArrays
    }

    const graduacoesArray = formacaoAcademica.GRADUACAO_asArray
    const especializacoesArray = formacaoAcademica.ESPECIALIZACAO_asArray
    const mestradosArray = formacaoAcademica.MESTRADO_asArray
    const doutoradosArray = formacaoAcademica.DOUTORADO_asArray
    const posDoutoradosArray = formacaoAcademica['POS-DOUTORADO_asArray']
    const livresDocenciasArray = formacaoAcademica['LIVRE-DOCENCIA_asArray']
    const cursosTecnicosProfissionalizantesArray =
      formacaoAcademica['CURSO-TECNICO-PROFISSIONALIZANTE_asArray']
    const mestradosProfissionalizantesArray =
      formacaoAcademica['MESTRADO-PROFISSIONALIZANTE_asArray']
    const ensinosFundamentaisPrimeiroGrauArray =
      formacaoAcademica['ENSINO-FUNDAMENTAL-PRIMEIRO-GRAU_asArray']
    const ensinosMediosSegundoGrauArray =
      formacaoAcademica['ENSINO-MEDIO-SEGUNDO-GRAU_asArray']
    const residenciasMedicasArray =
      formacaoAcademica['RESIDENCIA-MEDICA_asArray']
    const aperfeicoamentosArray = formacaoAcademica.APERFEICOAMENTO_asArray

    if (graduacoesArray && graduacoesArray.length > 0) {
      dadosGeraisArrays.graduacoes = graduacoesArray.map((grad: any) => {
        return {
          ano: grad['_ANO-DE-CONCLUSAO']
        }
      })
    }

    if (especializacoesArray && especializacoesArray.length > 0) {
      dadosGeraisArrays.especializacoes = especializacoesArray.map(
        (espec: any) => {
          return {
            ano: espec['_ANO-DE-CONCLUSAO']
          }
        }
      )
    }

    if (mestradosArray && mestradosArray.length > 0) {
      dadosGeraisArrays.mestrados = mestradosArray.map((mestrado: any) => {
        return {
          ano: mestrado['_ANO-DE-CONCLUSAO']
        }
      })
    }

    if (doutoradosArray && doutoradosArray.length > 0) {
      dadosGeraisArrays.doutorados = doutoradosArray.map((doutorado: any) => {
        return {
          ano: doutorado['_ANO-DE-CONCLUSAO']
        }
      })
    }

    if (posDoutoradosArray && posDoutoradosArray.length > 0) {
      dadosGeraisArrays.posDoutorados = posDoutoradosArray.map(
        (posDoutorado: any) => {
          return {
            ano: posDoutorado['_ANO-DE-CONCLUSAO']
          }
        }
      )
    }

    if (livresDocenciasArray && livresDocenciasArray.length > 0) {
      dadosGeraisArrays.livresDocencias = livresDocenciasArray.map(
        (livreDocencia: any) => {
          return {
            ano: livreDocencia['_ANO-DE-CONCLUSAO']
          }
        }
      )
    }

    if (
      cursosTecnicosProfissionalizantesArray &&
      cursosTecnicosProfissionalizantesArray.length > 0
    ) {
      dadosGeraisArrays.cursosTecnicosProfissionalizantes =
        cursosTecnicosProfissionalizantesArray.map(
          (cursosTecnicosProfissionalizante: any) => {
            return {
              ano: cursosTecnicosProfissionalizante['_ANO-DE-CONCLUSAO']
            }
          }
        )
    }

    if (
      mestradosProfissionalizantesArray &&
      mestradosProfissionalizantesArray.length > 0
    ) {
      dadosGeraisArrays.mestradosProfissionalizantes =
        mestradosProfissionalizantesArray.map(
          (mestradosProfissionalizante: any) => {
            return {
              ano: mestradosProfissionalizante['_ANO-DE-CONCLUSAO']
            }
          }
        )
    }

    if (
      ensinosFundamentaisPrimeiroGrauArray &&
      ensinosFundamentaisPrimeiroGrauArray.length > 0
    ) {
      dadosGeraisArrays.ensinosFundamentaisPrimeiroGrau =
        ensinosFundamentaisPrimeiroGrauArray.map(
          (ensinoFundamentalPrimeiroGrau: any) => {
            return {
              ano: ensinoFundamentalPrimeiroGrau['_ANO-DE-CONCLUSAO']
            }
          }
        )
    }

    if (
      ensinosMediosSegundoGrauArray &&
      ensinosMediosSegundoGrauArray.length > 0
    ) {
      dadosGeraisArrays.ensinosMediosSegundoGrau =
        ensinosMediosSegundoGrauArray.map((ensinoMedioSegundoGrau: any) => {
          return {
            ano: ensinoMedioSegundoGrau['_ANO-DE-CONCLUSAO']
          }
        })
    }

    if (residenciasMedicasArray && residenciasMedicasArray.length > 0) {
      dadosGeraisArrays.residenciasMedicas = residenciasMedicasArray.map(
        (residenciaMedica: any) => {
          return {
            ano: residenciaMedica['_ANO-DE-CONCLUSAO']
          }
        }
      )
    }

    if (aperfeicoamentosArray && aperfeicoamentosArray.length > 0) {
      dadosGeraisArrays.aperfeicoamentos = aperfeicoamentosArray.map(
        (aperfeicoamento: any) => {
          return {
            ano: aperfeicoamento['_ANO-DE-CONCLUSAO']
          }
        }
      )
    }

    return dadosGeraisArrays
  }

  getDemaisTiposDeProducaoTecnica(
    demaisTiposDeProducaoTecnica: any
  ): DemaisTiposDeProducaoTecnicaArrays {
    const demaisTiposDeProducaoTecnicaArrays: DemaisTiposDeProducaoTecnicaArrays =
      {
        cartasMapasOuSimilares: [],
        manutencoesDeObrasArtisticas: [],
        maquetes: [],
        relatoriosDePesquisas: []
      }

    if (!demaisTiposDeProducaoTecnica) return demaisTiposDeProducaoTecnicaArrays

    const cartasMapasOuSimilaresArray =
      demaisTiposDeProducaoTecnica['CARTA-MAPA-OU-SIMILAR_asArray']
    const manutencoesDeObrasArtisticasArray =
      demaisTiposDeProducaoTecnica['MANUTENCAO-DE-OBRA-ARTISTICA_asArray']
    const maquetesArray = demaisTiposDeProducaoTecnica.MAQUETE_asArray
    const relatoriosDePesquisasArray =
      demaisTiposDeProducaoTecnica['RELATORIO-DE-PESQUISA_asArray']

    if (cartasMapasOuSimilaresArray && cartasMapasOuSimilaresArray.length > 0) {
      demaisTiposDeProducaoTecnicaArrays.cartasMapasOuSimilares =
        cartasMapasOuSimilaresArray.map((cartaMapaOuSimilar: any) => {
          return {
            ano: cartaMapaOuSimilar['DADOS-BASICOS-DE-CARTA-MAPA-OU-SIMILAR']
              ._ANO
          }
        })
    }

    if (
      manutencoesDeObrasArtisticasArray &&
      manutencoesDeObrasArtisticasArray.length > 0
    ) {
      demaisTiposDeProducaoTecnicaArrays.manutencoesDeObrasArtisticas =
        manutencoesDeObrasArtisticasArray.map(
          (manutencaoDeObraArtistica: any) => {
            return {
              ano: manutencaoDeObraArtistica[
                'DADOS-BASICOS-DE-MANUTENCAO-DE-OBRA-ARTISTICA'
              ]._ANO
            }
          }
        )
    }

    if (maquetesArray && maquetesArray.length > 0) {
      demaisTiposDeProducaoTecnicaArrays.maquetes = maquetesArray.map(
        (maquete: any) => {
          return {
            ano: maquete['DADOS-BASICOS-DA-MAQUETE']._ANO
          }
        }
      )
    }

    if (relatoriosDePesquisasArray && relatoriosDePesquisasArray.length > 0) {
      demaisTiposDeProducaoTecnicaArrays.relatoriosDePesquisas =
        relatoriosDePesquisasArray.map((relatorioDePesquisa: any) => {
          return {
            ano: relatorioDePesquisa['DADOS-BASICOS-DO-RELATORIO-DE-PESQUISA']
              ._ANO
          }
        })
    }

    return demaisTiposDeProducaoTecnicaArrays
  }

  getFormacaoComplementar(
    formacoesComplementares: any
  ): FormacoesComplementaresArrays {
    const formacoesComplementaresArrays: FormacoesComplementaresArrays = {
      formacoesComplementaresDeExtensaoUniversitaria: [],
      mbas: [],
      formacoesComplementaresCursosDeCurtaDuracao: [],
      outros: []
    }

    if (!formacoesComplementares) return formacoesComplementaresArrays

    const formacoesComplementaresDeExtensaoUniversitariaArray =
      formacoesComplementares[
        'FORMACAO-COMPLEMENTAR-DE-EXTENSAO-UNIVERSITARIA_asArray'
      ]
    const mbasArray = formacoesComplementares.MBA_asArray
    const formacoesComplementaresCursosDeCurtaDuracaoArray =
      formacoesComplementares[
        'FORMACAO-COMPLEMENTAR-CURSO-DE-CURTA-DURACAO_asArray'
      ]
    const outrosArray = formacoesComplementares.OUTROS_asArray

    if (
      formacoesComplementaresDeExtensaoUniversitariaArray &&
      formacoesComplementaresDeExtensaoUniversitariaArray.length > 0
    ) {
      formacoesComplementaresArrays.formacoesComplementaresDeExtensaoUniversitaria =
        formacoesComplementaresDeExtensaoUniversitariaArray.map(
          (formacaoComplementarDeExtensaoUniversitaria: any) => {
            return {
              ano: formacaoComplementarDeExtensaoUniversitaria[
                '_ANO-DE-CONCLUSAO'
              ]
            }
          }
        )
    }

    if (mbasArray && mbasArray.length > 0) {
      formacoesComplementaresArrays.mbas = mbasArray.map((mba: any) => {
        return {
          ano: mba['_ANO-DE-CONCLUSAO']
        }
      })
    }

    if (
      formacoesComplementaresCursosDeCurtaDuracaoArray &&
      formacoesComplementaresCursosDeCurtaDuracaoArray.length > 0
    ) {
      formacoesComplementaresArrays.formacoesComplementaresCursosDeCurtaDuracao =
        formacoesComplementaresCursosDeCurtaDuracaoArray.map(
          (formacaoComplementarCursosDeCurtaDuracao: any) => {
            return {
              ano: formacaoComplementarCursosDeCurtaDuracao['_ANO-DE-CONCLUSAO']
            }
          }
        )
    }

    if (outrosArray && outrosArray.length > 0) {
      formacoesComplementaresArrays.outros = outrosArray.map((outro: any) => {
        return {
          ano: outro['_ANO-DE-CONCLUSAO']
        }
      })
    }

    return formacoesComplementaresArrays
  }

  getParticipacoesEmBancaTrabalhosConclusao(
    data: any
  ): ParticipacoesEmBancaTrabalhosConclusaoArrays {
    const participacoesEmBancaTrabalhosConclusaoArrays: ParticipacoesEmBancaTrabalhosConclusaoArrays =
      {
        participacoesEmBancasDeMestrado: [],
        participacoesEmBancasDeDoutorado: [],
        participacoesEmBancasDeExameQualificacao: [],
        participacoesEmBancasDeAperfeicoamentoEspecializacao: [],
        participacoesEmBancasDeGraduacao: [],
        outrasParticipacoesEmBancas: []
      }

    if (!data) {
      return participacoesEmBancaTrabalhosConclusaoArrays
    }

    const participacoesEmBancasDeMestradoArray =
      data['PARTICIPACAO-EM-BANCA-DE-MESTRADO_asArray']
    const participacoesEmBancasDeDoutoradoArray =
      data['PARTICIPACAO-EM-BANCA-DE-DOUTORADO_asArray']
    const participacoesEmBancasDeExameQualificacaoArray =
      data['PARTICIPACAO-EM-BANCA-DE-EXAME-QUALIFICACAO_asArray']
    const participacoesEmBancasDeAperfeicoamentoEspecializacaoArray =
      data['PARTICIPACAO-EM-BANCA-DE-APERFEICOAMENTO-ESPECIALIZACAO_asArray']
    const participacoesEmBancasDeGraduacaoArray =
      data['PARTICIPACAO-EM-BANCA-DE-GRADUACAO_asArray']
    const outrasParticipacoesEmBancasArray =
      data['OUTRAS-PARTICIPACOES-EM-BANCA_asArray']

    if (
      participacoesEmBancasDeMestradoArray &&
      participacoesEmBancasDeMestradoArray.length > 0
    ) {
      participacoesEmBancaTrabalhosConclusaoArrays.participacoesEmBancasDeMestrado =
        participacoesEmBancasDeMestradoArray.map(
          (participacaoEmBancasDeMestrado: any) => {
            return {
              ano: participacaoEmBancasDeMestrado[
                'DADOS-BASICOS-DA-PARTICIPACAO-EM-BANCA-DE-MESTRADO'
              ]._ANO
            }
          }
        )
    }

    if (
      participacoesEmBancasDeDoutoradoArray &&
      participacoesEmBancasDeDoutoradoArray.length > 0
    ) {
      participacoesEmBancaTrabalhosConclusaoArrays.participacoesEmBancasDeDoutorado =
        participacoesEmBancasDeDoutoradoArray.map(
          (participacaoEmBancasDeDoutorado: any) => {
            return {
              ano: participacaoEmBancasDeDoutorado[
                'DADOS-BASICOS-DA-PARTICIPACAO-EM-BANCA-DE-DOUTORADO'
              ]._ANO
            }
          }
        )
    }

    if (
      participacoesEmBancasDeExameQualificacaoArray &&
      participacoesEmBancasDeExameQualificacaoArray.length > 0
    ) {
      participacoesEmBancaTrabalhosConclusaoArrays.participacoesEmBancasDeExameQualificacao =
        participacoesEmBancasDeExameQualificacaoArray.map(
          (participacaoEmBancasDeExameQualificacao: any) => {
            return {
              ano: participacaoEmBancasDeExameQualificacao[
                'DADOS-BASICOS-DA-PARTICIPACAO-EM-BANCA-DE-EXAME-QUALIFICACAO'
              ]._ANO
            }
          }
        )
    }

    if (
      participacoesEmBancasDeAperfeicoamentoEspecializacaoArray &&
      participacoesEmBancasDeAperfeicoamentoEspecializacaoArray.length > 0
    ) {
      participacoesEmBancaTrabalhosConclusaoArrays.participacoesEmBancasDeAperfeicoamentoEspecializacao =
        participacoesEmBancasDeAperfeicoamentoEspecializacaoArray.map(
          (participacaoEmBancasDeAperfeicoamentoEspecializacao: any) => {
            return {
              ano: participacaoEmBancasDeAperfeicoamentoEspecializacao[
                'DADOS-BASICOS-DA-PARTICIPACAO-EM-BANCA-DE-APERFEICOAMENTO-ESPECIALIZACAO'
              ]._ANO
            }
          }
        )
    }

    if (
      participacoesEmBancasDeGraduacaoArray &&
      participacoesEmBancasDeGraduacaoArray.length > 0
    ) {
      participacoesEmBancaTrabalhosConclusaoArrays.participacoesEmBancasDeGraduacao =
        participacoesEmBancasDeGraduacaoArray.map(
          (participacaoEmBancasDeGraduacao: any) => {
            return {
              ano: participacaoEmBancasDeGraduacao[
                'DADOS-BASICOS-DA-PARTICIPACAO-EM-BANCA-DE-GRADUACAO'
              ]._ANO
            }
          }
        )
    }

    if (
      outrasParticipacoesEmBancasArray &&
      outrasParticipacoesEmBancasArray.length > 0
    ) {
      participacoesEmBancaTrabalhosConclusaoArrays.outrasParticipacoesEmBancas =
        outrasParticipacoesEmBancasArray.map(
          (outrasParticipacoesEmBancas: any) => {
            return {
              ano: outrasParticipacoesEmBancas[
                'DADOS-BASICOS-DE-OUTRAS-PARTICIPACOES-EM-BANCA'
              ]._ANO
            }
          }
        )
    }

    return participacoesEmBancaTrabalhosConclusaoArrays

    // PARTICIPACAO-EM-BANCA-TRABALHOS-CONCLUSAO': {
    //   'PARTICIPACAO-EM-BANCA-DE-MESTRADO_asArray': any[]
    //   'PARTICIPACAO-EM-BANCA-DE-DOUTORADO_asArray': any[]
    //   'PARTICIPACAO-EM-BANCA-DE-EXAME-QUALIFICACAO_asArray': any[]
    //   'PARTICIPACAO-EM-BANCA-DE-APERFEICOAMENTO-ESPECIALIZACAO_asArray': any[]
    //   'PARTICIPACAO-EM-BANCA-DE-GRADUACAO_asArray': any[]
    //   'OUTRAS-PARTICIPACOES-EM-BANCA_asArray': any[]
  }

  /**
   * Returns the number of events works by a professor in a year.
   */
  countWorksByProfessorAndYear(
    professor: string,
    year: string,
    eventsWorks: TrabalhoEmEventos[]
  ): number {
    // Counts the number of events works by a professor in a year.
    return eventsWorks.filter((work) => {
      return (
        work.anoDeRealizacao === year && (work.nome === professor || !work.nome)
      )
    }).length
  }
}
