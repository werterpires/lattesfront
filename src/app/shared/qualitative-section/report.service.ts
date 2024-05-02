import { Injectable } from '@angular/core'

import * as ExcelJS from 'exceljs'
import { Participacao, TrabalhoEmEventos } from '../services/objTypes'
import { Props } from '../quantitative-section/tpes'

@Injectable({ providedIn: 'root' })
export class ReportService {
  async createSheet(
    sectionProps: Props[],
    sectionObjects: Participacao[] | TrabalhoEmEventos[],
    sectionType: string,
    author: string
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('sectionType')

    worksheet.addRow(this.makeHeadersWithParticipantes(sectionProps, author))
    sectionObjects.forEach((sectionObject) => {
      const row = this.makeRow(sectionType, sectionObject, sectionProps)
      worksheet.addRow(row)
    })

    const buffer = await workbook.xlsx.writeBuffer()
    this.saveAsExcelFile(buffer, 'data')
  }

  makeHeadersWithParticipantes(
    sectionProps: Props[],
    author: string
  ): string[] {
    const headers = []
    for (const prop of sectionProps) {
      headers.push(prop.name)
    }
    if (author === 'participante') {
      headers.push('Participantes')
    } else {
      headers.push('Autores')
    }

    headers.push('Palavras-chave')
    return headers
  }

  makeRow(
    sectionType: string,
    sectionObj: Participacao | TrabalhoEmEventos,
    sectionProps: Props[]
  ): string[] {
    let row: string[]

    switch (sectionType) {
      case 'participacoesEmSimposios':
      case 'participacoesEmEncontros':
      case 'outrasParticipacoesEmEventosCongressos':
        row = this.makeRowOfParticipation(sectionProps, sectionObj)
        break

      case 'trabalhosEmEventos':
        row = this.makeRowOfEventWork(sectionProps, sectionObj)
        break

      default:
        throw new Error('Invalid section type ' + sectionType)
    }

    return row
  }

  makeRowOfParticipation(
    sectionProps: Props[],
    sectionObject: Participacao
  ): any[] {
    const row = []

    for (const prop of sectionProps) {
      const key = prop.key as keyof Participacao
      row.push(sectionObject[key])
    }

    let participantes = ''

    sectionObject.participanteDeEventosCongressos?.forEach((participante) => {
      participantes =
        participantes +
        `${participante.nomeParaCitacaoDoParticipanteDeEventosCongressos}.\n `
    })

    row.push(participantes)

    const palavrasChave = sectionObject.palavrasChave?.join(', ')
    row.push(palavrasChave)

    return row
  }

  makeRowOfEventWork(
    sectionProps: Props[],
    sectionObject: TrabalhoEmEventos
  ): any[] {
    const row = []

    for (const prop of sectionProps) {
      const key = prop.key as keyof TrabalhoEmEventos
      row.push(sectionObject[key])
    }

    let autores = ''

    sectionObject.autores?.forEach((autor) => {
      autores = autores + `${autor.nomeParaCitacao}.\n `
    })

    row.push(autores)

    const palavrasChave = sectionObject.palavrasChave?.join(', ')
    row.push(palavrasChave)

    return row
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const a: HTMLAnchorElement = document.createElement('a')
    a.href = URL.createObjectURL(data)
    a.download = fileName + '.xlsx'
    a.click()
  }
}
