/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core'
import {
  DadosGeraisArrays,
  DemaisTiposDeProducaoBibliograficaArrays,
  TrabalhoEmEventos,
  generalSections
} from './objTypes'
import { UtilsService } from './util.service'
import { IXml } from '../add-curriculums/types'

@Injectable({
  providedIn: 'root'
})
export class GeneralSectionsService {
  constructor(private readonly utilsService: UtilsService) {}

  makeGeneralSections(data: IXml): generalSections {
    const dadosGerais = data['DADOS-GERAIS']
    const demaisTiposDeProducaoBibliografica =
      data['PRODUCAO-BIBLIOGRAFICA']['DEMAIS-TIPOS-DE-PRODUCAO-BIBLIOGRAFICA']

    const dadosGeraisSubData = this.getDadosGerais(dadosGerais)
    const demaisTiposDeProducaoBibliograficaSubData =
      this.getDemaisTiposDeProducaoBibliografica(
        demaisTiposDeProducaoBibliografica
      )
    console.log(
      'demaisTiposDeProducaoBibliograficaSubData',
      demaisTiposDeProducaoBibliograficaSubData
    )

    // console.log('data s', data)

    const generalSections: generalSections = {
      ...dadosGeraisSubData,
      ...demaisTiposDeProducaoBibliograficaSubData
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
