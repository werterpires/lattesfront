import { Component, EventEmitter, Output } from '@angular/core'
import { ModalComponent } from '../modal/modal.component'
import { ICreateCurriculum, ICreateCurriculums } from '../services/types'
import X2JS from 'x2js'
import { EventsWorksService } from '../services/eventWorksService'
import {
  MidiaSocialWebsiteBlog,
  OutraProducaoTecnica,
  OutrasParticipacoesEmEventosCongressos,
  ParticipacaoEmCongresso,
  ParticipacaoEmEncontros,
  ParticipacaoEmSeminario,
  ParticipacaoEmSimposio,
  TrabalhoEmEventos
} from '../services/objTypes'
import { LoaderService } from '../loader/loader.service'
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http'
import { AddCurriculumsService } from './add-curriculums.service'
import { AlertsService } from '../alerts/alerts.service'
import { CurriculumnsService } from '../services/curriculumns.service'
import { NgFor, NgIf, NgStyle } from '@angular/common'
import { IXml } from './types'
import { OtherParticipationsInEventsConferencesService } from '../services/otherParticipationsInEventsConferencesService'
import { ParticipationInMeetingService } from '../services/participationInMeetingService'
import { ParticipationInSymposiumService } from '../services/participationInSymposiumService'
import { ParticipationInSeminaryService } from '../services/participationInSeminaryService'
import { ParticipationInCongressService } from '../services/participationInCongressService'
import { OtherTechnicalProductionService } from '../services/otherTechnicalProductionService'
import { SocialMediaWebsiteBlogService } from '../services/socialMediaWebsiteBlogService'

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
    private readonly eventsWorksService: EventsWorksService,
    private readonly otherParticipationsInEventsConferencesService: OtherParticipationsInEventsConferencesService,
    private readonly participationInMeetingService: ParticipationInMeetingService,
    private readonly participationInSimposiumService: ParticipationInSymposiumService,
    private readonly participationInSeminaryService: ParticipationInSeminaryService,
    private readonly participationInCongressService: ParticipationInCongressService,
    private readonly otherTechnicalProductionService: OtherTechnicalProductionService,
    private readonly socialMediaWebsiteBlogService: SocialMediaWebsiteBlogService,
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
    console.log(
      'objeto pronto:',
      value['PRODUCAO-TECNICA']['DEMAIS-TIPOS-DE-PRODUCAO-TECNICA']
    )
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

    const dadosComplementares = value['DADOS-COMPLEMENTARES']
    const participacaoEmEventosCongressos =
      dadosComplementares['PARTICIPACAO-EM-EVENTOS-CONGRESSOS']

    const producaoTecnica = value['PRODUCAO-TECNICA']
    const demaisTiposProducaoTecnica =
      producaoTecnica['DEMAIS-TIPOS-DE-PRODUCAO-TECNICA']

    let trabalhosEmEventos: TrabalhoEmEventos[] = []
    let outrasParticipacoesEmEventosCongressos: OutrasParticipacoesEmEventosCongressos[] =
      []
    let participacoesEmEncontros: ParticipacaoEmEncontros[] = []
    let participacoesEmSimposios: ParticipacaoEmSimposio[] = []
    let participacoesEmSeminarios: ParticipacaoEmSeminario[] = []
    let participacoesEmCongressos: ParticipacaoEmCongresso[] = []
    let outrasProducoesTecnicas: OutraProducaoTecnica[] = []
    let midiasSociaisWebsitesBlogs: MidiaSocialWebsiteBlog[] = []

    if (producaoBibliografica?.['TRABALHOS-EM-EVENTOS']) {
      trabalhosEmEventos = this.eventsWorksService.makeTrabalhoEmEvento(
        producaoBibliografica['TRABALHOS-EM-EVENTOS'][
          'TRABALHO-EM-EVENTOS_asArray'
        ]
      )
    }

    if (
      participacaoEmEventosCongressos?.[
        'OUTRAS-PARTICIPACOES-EM-EVENTOS-CONGRESSOS_asArray'
      ]
    ) {
      outrasParticipacoesEmEventosCongressos =
        this.otherParticipationsInEventsConferencesService.makeOutrasParticipacoesEmEventosCongressos(
          participacaoEmEventosCongressos[
            'OUTRAS-PARTICIPACOES-EM-EVENTOS-CONGRESSOS_asArray'
          ]
        )
    }

    if (participacaoEmEventosCongressos?.['PARTICIPACAO-EM-ENCONTRO_asArray']) {
      participacoesEmEncontros =
        this.participationInMeetingService.makeParticipacoesEmEncontros(
          participacaoEmEventosCongressos['PARTICIPACAO-EM-ENCONTRO_asArray']
        )
    }

    if (participacaoEmEventosCongressos?.['PARTICIPACAO-EM-SIMPOSIO_asArray']) {
      participacoesEmSimposios =
        this.participationInSimposiumService.makeParticipacoesEmSimposios(
          participacaoEmEventosCongressos['PARTICIPACAO-EM-SIMPOSIO_asArray']
        )
    }

    if (
      participacaoEmEventosCongressos?.['PARTICIPACAO-EM-SEMINARIO_asArray']
    ) {
      participacoesEmSeminarios =
        this.participationInSeminaryService.makeParticipacoesEmSeminarios(
          participacaoEmEventosCongressos['PARTICIPACAO-EM-SEMINARIO_asArray']
        )
    }

    if (
      participacaoEmEventosCongressos?.['PARTICIPACAO-EM-CONGRESSO_asArray']
    ) {
      participacoesEmCongressos =
        this.participationInCongressService.makeParticipacoesEmCongressos(
          participacaoEmEventosCongressos['PARTICIPACAO-EM-CONGRESSO_asArray']
        )
    }

    if (demaisTiposProducaoTecnica?.['OUTRA-PRODUCAO-TECNICA_asArray']) {
      outrasProducoesTecnicas =
        this.otherTechnicalProductionService.makeOutraProducaoTecnica(
          demaisTiposProducaoTecnica['OUTRA-PRODUCAO-TECNICA_asArray']
        )
    }

    if (demaisTiposProducaoTecnica?.['MIDIA-SOCIAL-WEBSITE-BLOG_asArray']) {
      midiasSociaisWebsitesBlogs =
        this.socialMediaWebsiteBlogService.makeMidiaSocialWebsiteBlog(
          demaisTiposProducaoTecnica['MIDIA-SOCIAL-WEBSITE-BLOG_asArray']
        )
    }

    const lattesObj = {
      nome,
      trabalhosEmEventos,
      outrasParticipacoesEmEventosCongressos,
      participacoesEmEncontros,
      participacoesEmSimposios,
      participacoesEmSeminarios,
      participacoesEmCongressos,
      outrasProducoesTecnicas,
      midiasSociaisWebsitesBlogs
    }

    console.log('midiasSociaisWebsitesBlogs', midiasSociaisWebsitesBlogs)

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
