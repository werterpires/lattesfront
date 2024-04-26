import { Injectable } from '@angular/core'

import * as ExcelJS from 'exceljs'
import { CountService } from './counts.service'
import {
  OutrasParticipacoesEmEventosCongressos,
  TrabalhoEmEventos
} from '../services/objTypes'

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private readonly countService: CountService) {}
  async createSheet(
    yersToConsider: string[],
    professors: string[],
    sectionObjects:
      | OutrasParticipacoesEmEventosCongressos[]
      | TrabalhoEmEventos[],
    sectionType: string
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(
      'Outras participações em eventos e congressos'
    )

    worksheet.addRow(this.makeHeaders(yersToConsider))
    professors.forEach((professor) => {
      const row = this.makeRow(
        professor,
        yersToConsider,
        sectionObjects,
        sectionType
      )
      worksheet.addRow(row)
    })

    const buffer = await workbook.xlsx.writeBuffer()
    this.saveAsExcelFile(buffer, 'data')
  }

  makeHeaders(yersToConsider: string[]): string[] {
    const headers = ['Professor']

    for (const year of yersToConsider) {
      headers.push(year)
    }
    headers.push('Total')

    return headers
  }

  makeRow(
    professor: string,
    yersToConsider: string[],
    sectionObjects:
      | OutrasParticipacoesEmEventosCongressos[]
      | TrabalhoEmEventos[],
    sectionType: string
  ): string[] {
    const row = [professor]
    for (const year of yersToConsider) {
      row.push(
        this.countService
          .countSectionsByProfessorAndYearUsingAny(
            professor,
            year,
            sectionObjects,
            sectionType
          )
          .toString()
      )
    }

    row.push(
      this.countService
        .countSectionsByProfessorUsingAny(
          professor,
          yersToConsider,
          sectionObjects,
          sectionType
        )
        .toString()
    )
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
