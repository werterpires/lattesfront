import { Component, EventEmitter, Output } from '@angular/core'
import { ModalComponent } from '../modal/modal.component'
import { ICreateCurriculum, ICreateCurriculums } from '../services/types'
import X2JS from 'x2js'
import { EventsWorksService } from '../services/eventWorksService'
import { TrabalhoEmEventos } from '../services/objTypes'
import { LoaderService } from '../loader/loader.service'
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http'
import { AddCurriculumsService } from './add-curriculums.service'
import { AlertsService } from '../alerts/alerts.service'
import { CurriculumnsService } from '../services/curriculumns.service'
import { NgFor, NgIf, NgStyle } from '@angular/common'
import { IXml } from './types'

@Component({
  selector: 'app-add-curriculums',
  standalone: true,
  imports: [ModalComponent, HttpClientModule, NgFor, NgIf, NgStyle],
  providers: [AddCurriculumsService],
  templateUrl: './add-curriculums.component.html',
  styleUrl: './add-curriculums.component.css'
})
export class AddCurriculumsComponent {
  @Output() closeEmitter = new EventEmitter()
  buttonContent: string = 'Clique para selecionar arquivos ou solte-os aqui.'
  constructor(
    private readonly utilsService: EventsWorksService,
    private readonly loader: LoaderService,
    private readonly addCurriculumService: AddCurriculumsService,
    private readonly alertService: AlertsService,
    private readonly curriculumnsService: CurriculumnsService
  ) {}

  curriculumsData: ICreateCurriculums = {
    curriculums: []
  }

  addCurriculum(): void {
    this.loader.showLoader()
    this.addCurriculumService.addCurriculum(this.curriculumsData).subscribe({
      next: (data) => {
        this.alertService.showAlerts(
          'success',
          'Currículo adicionado com sucesso',
          []
        )
        this.curriculumnsService.addCurriculumns(data)
        this.curriculumsData = {
          curriculums: []
        }
        this.loader.hideLoader()
        this.closeEmitter.emit()
      },
      error: (error: HttpErrorResponse) => {
        const messages: string[] =
          typeof error.error.message === 'string'
            ? [error.error.message]
            : ['Ocorreu um erro ao tentar cadastrar o currículo.']
        this.alertService.showAlerts(
          'error',
          'Erro ao adicionar currículos',
          messages
        )

        this.loader.hideLoader()
      }
    })
  }

  parseXml(xmlString: string): any {
    const parser = new X2JS({
      arrayAccessForm: 'property',
      skipEmptyTextNodesForObj: false
    })
    const jsonObj = parser.xml2js(xmlString)

    return jsonObj
  }

  convertArrayBufferToString(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer)
    const byteCharacters = Array.from({ length: byteArray.length }, (_, i) =>
      String.fromCharCode(byteArray[i])
    )
    return byteCharacters.join('')
  }

  makeCreateCurriculumDto(curr: any): ICreateCurriculum | null {
    const value: IXml = curr.value
    if (
      !value['_NUMERO-IDENTIFICADOR'] ||
      !value['_DATA-ATUALIZACAO'] ||
      !value['_HORA-ATUALIZACAO'] ||
      !(typeof value['_DATA-ATUALIZACAO'] === 'string')
    ) {
      return null
    }

    const updatedDate: string = this.getUpdatedDate(
      value['_DATA-ATUALIZACAO'],
      value['_HORA-ATUALIZACAO']
    )

    const nome = value['DADOS-GERAIS']['_NOME-COMPLETO']

    const producaoBibliografica = value['PRODUCAO-BIBLIOGRAFICA']

    let trabalhosEmEventos: TrabalhoEmEventos[] = []

    if (producaoBibliografica?.['TRABALHOS-EM-EVENTOS']) {
      trabalhosEmEventos = this.utilsService.makeTrabalhoEmEvento(
        producaoBibliografica['TRABALHOS-EM-EVENTOS'][
          'TRABALHO-EM-EVENTOS_asArray'
        ]
      )
    }

    const lattesObj = {
      nome,
      trabalhosEmEventos
    }

    const createCurriculumDto = {
      lattesId: value['_NUMERO-IDENTIFICADOR'],
      active: true,
      serviceYears: '',
      curriculum: JSON.stringify(lattesObj),
      updatedDate
    }

    return createCurriculumDto
  }

  getUpdatedDate(data: string, hora: string): string {
    return (
      data.substring(4, 8) + data.substring(2, 4) + data.substring(0, 2) + hora
    )
  }

  readFile(file: File): void {
    const reader = new FileReader()
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer
      const xmlString = this.convertArrayBufferToString(arrayBuffer)

      const result = this.parseXml(xmlString)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const curriculoData = Object.entries(result).map(([key, value]) => ({
        key,
        value
      }))

      const createCurriculumDto = this.makeCreateCurriculumDto(curriculoData[0])

      if (createCurriculumDto) {
        this.curriculumsData.curriculums.push(createCurriculumDto)
      }
    }
    reader.readAsArrayBuffer(file) // Leia o arquivo como ArrayBuffer
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.readFile(files[i])
      }
    }
  }
}
