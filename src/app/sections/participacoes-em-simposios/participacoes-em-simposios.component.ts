import { Component } from '@angular/core'
import { CurriculumnsService } from '../../shared/services/curriculumns.service'
import { ICurriculum } from '../../shared/services/types'
import { NgFor, NgIf } from '@angular/common'
import { ITableElements } from '../../shared/qualitative-analyses/types'

import { AccordionComponent } from '../../shared/accordion/accordion.component'
import { QuantitativeSectionComponent } from 'src/app/shared/quantitative-section/quantitative-section.component'
import { Participacao } from 'src/app/shared/services/objTypes'
import { ParticipationProps } from './types'
import { QualitativeSectionComponent } from 'src/app/shared/qualitative-section/qualitative-section.component'
import { Props } from 'src/app/shared/quantitative-section/tpes'
import { RankingSectionComponent } from 'src/app/shared/ranking-section/ranking-section.component'

@Component({
  selector: 'app-participacoes-em-simposios',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AccordionComponent,
    QuantitativeSectionComponent,
    QualitativeSectionComponent,
    RankingSectionComponent
  ],
  templateUrl: './participacoes-em-simposios.component.html',
  styleUrl: './participacoes-em-simposios.component.css'
})
export class ParticipacoesEmSimposiosComponent {
  curriculumns: ICurriculum[] = []
  participations: Participacao[] = []
  tableElements: ITableElements[] = [
    {
      title: 'Participações em simposios',
      property: 'participaçõesEmSimposios'
    }
  ]

  professors: Array<{ name: string; serviceYears: string }> = []

  participationProps: ParticipationProps[] = [
    {
      name: 'Professor',
      key: 'nome',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '320px'
    },

    {
      name: 'Ano',
      key: 'ano',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '40px'
    }
  ]

  participationQualyProps: Props[] = [
    {
      name: 'Professor',
      key: 'nome',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },
    {
      name: 'Natureza',
      key: 'natureza',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },
    {
      name: 'titulo',
      key: 'titulo',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '320px'
    },
    {
      name: 'Ano',
      key: 'ano',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },
    {
      name: 'País',
      key: 'pais',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },
    {
      name: 'Idioma',
      key: 'idioma',
      showFilter: false,
      ascending: true,
      filterObject: {
        text: [],
        disjunctive: true
      },
      width: '240px'
    },
    {
      name: 'Meio de divulgacão',
      key: 'meioDeDivulgacao',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },
    {
      name: 'Homepage do trabalho',
      key: 'homePageDoTrabalho',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },
    {
      name: 'Tipo de participação',
      key: 'tipoParticipacao',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },
    {
      name: 'Forma de participação',
      key: 'formaParticipacao',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },

    {
      name: 'DOI',
      key: 'doi',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },

    {
      name: 'Título em inglês',
      key: 'tituloIngles',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },
    {
      name: 'Nome do Evento',
      key: 'nomeDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },
    {
      name: 'Nome da instituição',
      key: 'nomeInstituicao',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },
    {
      name: 'Local do evento',
      key: 'localDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },
    {
      name: 'Cidade do evento',
      key: 'cidadeDoEvento',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    },
    {
      name: 'Nome do Evento em Inglês',
      key: 'nomeDoEventoIngles',
      showFilter: false,
      ascending: true,
      filterObject: { text: [], disjunctive: true },
      width: '240px'
    }
  ]

  constructor(private readonly curriculumnsService: CurriculumnsService) {
    this.curriculumnsService.curriculumns$.subscribe((curriculumns) => {
      this.curriculumns = curriculumns
      this.getProfessors()
      this.getParticipations()
    })
  }

  getProfessors(): void {
    this.professors = this.curriculumns.map((curriculo) => {
      return {
        name: curriculo.curriculum.nome,
        serviceYears: curriculo.serviceYears
      }
    })
  }

  countOutrasParticipacoesEmEventos(curriculum: ICurriculum): number {
    return curriculum.curriculum.participacoesEmSimposios.length
  }

  getParticipations(): void {
    this.participations = this.curriculumns.reduce<Participacao[]>(
      (participations, curriculum) =>
        participations.concat(
          curriculum.curriculum.participacoesEmSimposios.map(
            (participation) => ({
              ano: participation.ano,
              nome: curriculum.curriculum.nome,
              lattesid: curriculum.lattesId,
              active: curriculum.active,
              serviceYears: curriculum.serviceYears,
              tags: curriculum.tags,
              ...participation
            })
          )
        ),
      []
    )
  }
}
