import { Injectable } from '@angular/core'
import {
  AreasDoConhecimento,
  Autor,
  ParticipanteDeEventosCongressos
} from './objTypes'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  getLastFiveYears(): string[] {
    const currentYear = new Date().getFullYear()

    // Creates an array with the last five years
    return Array.from({ length: 5 }, (_, i) =>
      String(currentYear - i)
    ).reverse()
  }

  /**
   * Processes the years input by the user and adds them to the list of years to consider.
   * @param text The user input containing the years.
   */
  getYears(text: string): string[] {
    // New array of strings with the years
    let newText: string[] = []

    // Regular expression to detect year ranges (e.g., 2010-2015)
    const regexIntervalo = /\b(\d+)-(\d+)\b/g

    // Replaces year ranges with a list of separate years
    text = text.replace(regexIntervalo, (match, inicio, fim) => {
      if (typeof inicio !== 'string' || typeof fim !== 'string') {
        return ''
      }

      // Converts values to numbers
      const inicioNum = parseInt(inicio)
      const fimNum = parseInt(fim)
      // Checks if it's a valid range and if the number of years is less than 50
      if (
        !isNaN(inicioNum) &&
        !isNaN(fimNum) &&
        fimNum > inicioNum &&
        fimNum - inicioNum <= 50
      ) {
        // Adds the years to the new list
        for (let i = inicioNum; i <= fimNum; i++) {
          newText.push(i.toString())
        }
        // Removes the range from the input
        return ''
      } else {
        // Otherwise, returns the range as it is
        return match
      }
    })

    // Splits the input into multiple strings and removes whitespace
    const trechosRestantes = text.split(/\s+/).filter((trecho) => trecho.trim())

    newText.push(...trechosRestantes)

    // Removes duplicates and sorts the list
    newText = [...new Set(newText)].sort()

    return newText
  }

  makePalavrasChave(data: {
    'PALAVRAS-CHAVE': {
      '_PALAVRA-CHAVE-1'?: string
      '_PALAVRA-CHAVE-2'?: string
      '_PALAVRA-CHAVE-3'?: string
      '_PALAVRA-CHAVE-4'?: string
      '_PALAVRA-CHAVE-5'?: string
    }
  }): string[] {
    const palavrasChave: string[] = []
    if (data['PALAVRAS-CHAVE']) {
      palavrasChave.push(
        data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-1']
          ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-1']
          : ''
      )
      palavrasChave.push(
        data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-2']
          ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-2']
          : ''
      )
      palavrasChave.push(
        data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-3']
          ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-3']
          : ''
      )
      palavrasChave.push(
        data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-4']
          ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-4']
          : ''
      )
      palavrasChave.push(
        data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-5']
          ? data['PALAVRAS-CHAVE']['_PALAVRA-CHAVE-5']
          : ''
      )
    }
    return palavrasChave
  }

  makeAreasDoConhecimento(data: any): AreasDoConhecimento {
    const areasDoConhecimento: AreasDoConhecimento = {}
    if (data['AREA-DO-CONHECIMENTO-1']) {
      areasDoConhecimento.areaDoConhecimento1 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-ESPECIALIDADE']
      }
    }
    if (data['AREA-DO-CONHECIMENTO-2']) {
      areasDoConhecimento.areaDoConhecimento2 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-ESPECIALIDADE']
      }
    }
    if (data['AREA-DO-CONHECIMENTO-3']) {
      areasDoConhecimento.areaDoConhecimento3 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-ESPECIALIDADE']
      }
    }
    return areasDoConhecimento
  }

  makeParticipante(data: any): ParticipanteDeEventosCongressos[] | undefined {
    if (!data['PARTICIPANTE-DE-EVENTOS-CONGRESSOS_asArray']) {
      return undefined
    }

    const participantes: ParticipanteDeEventosCongressos[] = data[
      'PARTICIPANTE-DE-EVENTOS-CONGRESSOS_asArray'
    ].map((participante: any) => {
      return {
        nomeParaCitacaoDoParticipanteDeEventosCongressos:
          participante[
            '_NOME-PARA-CITACAO-DO-PARTICIPANTE-DE-EVENTOS-CONGRESSOS'
          ]
      }
    })

    return participantes
  }

  makeAutores(data: any): Autor[] | undefined {
    if (!data.AUTORES_asArray) {
      return undefined
    }
    const autors = data.AUTORES_asArray.map((autor: any) => {
      return {
        nomeCompletoDoAutor: autor['_NOME-COMPLETO-DO-AUTOR'],
        nomeParaCitacao: autor['_NOME-PARA-CITACAO'],
        ordemDeAutoria: autor['_ORDEM-DE-AUTORIA'],
        cpf: autor._CPF,
        numeroIdCNPQ: autor['_NUMERO-ID-CNPQ']
      }
    })

    return autors
  }
}
