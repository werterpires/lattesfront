import { Injectable } from '@angular/core'
import {
  ApresentacaoDeTrabalho,
  Artigo,
  CapituloDeLivroPublicado,
  CursoDeCurtaDuracaoMinistrado,
  DesenvolvimentoDeMaterialDidaticoOuInstrucional,
  Editoracao,
  LivroPublicadoOuOrganizado,
  MidiaSocialWebsiteBlog,
  OrganizacaoDeEvento,
  OutraProducaoBibliografica,
  OutraProducaoTecnica,
  Participacao,
  ProgramaDeRadioOuTV,
  TextoEmJornalOuRevista,
  TrabalhoEmEventos
} from '../services/objTypes'
import { CountService } from './counts.service'

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly countService: CountService) {}
  orderNow(
    orderProp: string,
    sectionObjects:
      | Participacao[]
      | TrabalhoEmEventos[]
      | OutraProducaoTecnica[],
    sectionType: string,
    ascending: boolean
  ):
    | Participacao[]
    | TrabalhoEmEventos[]
    | OutraProducaoTecnica[]
    | OrganizacaoDeEvento[] {
    // Filters with values applied

    switch (sectionType) {
      case 'participacoesEmCongressos':
      case 'participacoesEmSeminarios':
      case 'participacoesEmSimposios':
      case 'participacoesEmEncontros':
      case 'outrasParticipacoesEmEventosCongressos':
        this.orderParticipacoes(sectionObjects, orderProp, ascending)
        break

      case 'trabalhosEmEventos':
        this.orderEventsWorks(sectionObjects, orderProp, ascending)

        break
      case 'outrasProducoesTecnicas':
        this.orderOtherTechnicalProductions(
          sectionObjects,
          orderProp,
          ascending
        )
        break
      case 'midiasSociaisWebsitesBlogs':
        this.orderMidiasSociaisWebsitesBlogs(
          sectionObjects,
          orderProp,
          ascending
        )
        break
      case 'programasDeRadioOuTV':
        this.orderProgramasDeRadioOuTV(sectionObjects, orderProp, ascending)

        break
      case 'organizacoesDeEventos':
        this.orderOrganizacoesDeEventos(sectionObjects, orderProp, ascending)
        break
      case 'editoracoes':
        this.orderEditoracoes(sectionObjects, orderProp, ascending)
        break

      case 'desenvolvimentosDeMaterialDidaticoOuInstrucional':
        this.orderDesenvolvimentosDeMaterialDidaticos(
          sectionObjects,
          orderProp,
          ascending
        )
        break

      case 'cursosDeCurtaDuracaoMinistrados':
        this.orderCursosDeCurtaDuracaoMinistrados(
          sectionObjects,
          orderProp,
          ascending
        )
        break

      case 'artigosPublicados':
      case 'artigosAceitosParaPublicacao':
        this.orderArtigos(sectionObjects, orderProp, ascending)
        break

      case 'outrasProducoesBibliograficas':
        this.orderOutrasProducoesBibliograficas(
          sectionObjects,
          orderProp,
          ascending
        )
        break

      case 'textosEmRevistasOuJornais':
        this.orderTextosEmJornaisOuRevistas(
          sectionObjects,
          orderProp,
          ascending
        )
        break

      case 'apresentacoesDeTrabalho':
        this.orderApresentacoesDeTrabalhos(sectionObjects, orderProp, ascending)
        break
      case 'capitulosDeLivrosPublicados':
        this.orderCapitulosDeLivrosPublicados(
          sectionObjects,
          orderProp,
          ascending
        )
        break
      case 'livrosPublicadosOuOrganizados':
        this.orderLivrosPublicados(sectionObjects, orderProp, ascending)
        break
      default:
        throw new Error('Invalid section type')
    }

    return sectionObjects

    // Order the works after filtering
    // this.orderNow()
  }

  orderParticipacoes(
    sectionObjects: Participacao[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof Participacao

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderEventsWorks(
    sectionObjects: TrabalhoEmEventos[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof TrabalhoEmEventos

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderOtherTechnicalProductions(
    sectionObjects: OutraProducaoTecnica[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof OutraProducaoTecnica

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderMidiasSociaisWebsitesBlogs(
    sectionObjects: MidiaSocialWebsiteBlog[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof MidiaSocialWebsiteBlog

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderProgramasDeRadioOuTV(
    sectionObjects: ProgramaDeRadioOuTV[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof ProgramaDeRadioOuTV

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderOrganizacoesDeEventos(
    sectionObjects: OrganizacaoDeEvento[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof OrganizacaoDeEvento

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderEditoracoes(
    sectionObjects: Editoracao[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof Editoracao

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderDesenvolvimentosDeMaterialDidaticos(
    sectionObjects: DesenvolvimentoDeMaterialDidaticoOuInstrucional[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey =
      orderProp as keyof DesenvolvimentoDeMaterialDidaticoOuInstrucional

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderCursosDeCurtaDuracaoMinistrados(
    sectionObjects: CursoDeCurtaDuracaoMinistrado[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof CursoDeCurtaDuracaoMinistrado

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderApresentacoesDeTrabalhos(
    sectionObjects: ApresentacaoDeTrabalho[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof ApresentacaoDeTrabalho

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderArtigos(
    sectionObjects: Artigo[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof Artigo

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderOutrasProducoesBibliograficas(
    sectionObjects: OutraProducaoBibliografica[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof OutraProducaoBibliografica

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderTextosEmJornaisOuRevistas(
    sectionObjects: TextoEmJornalOuRevista[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof TextoEmJornalOuRevista

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderCapitulosDeLivrosPublicados(
    sectionObjects: CapituloDeLivroPublicado[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof CapituloDeLivroPublicado

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  orderLivrosPublicados(
    sectionObjects: LivroPublicadoOuOrganizado[],
    orderProp: string,
    ascending: boolean
  ): void {
    const propKey = orderProp as keyof LivroPublicadoOuOrganizado

    sectionObjects.sort((a, b) =>
      (a[propKey] || '') < (b[propKey] || '')
        ? ascending
          ? -1
          : 1
        : ascending
          ? 1
          : -1
    )
  }

  sortProfessorsByParticipationQuantity(
    sectionType: string,
    professors: string[],
    yersToConsider: string[],
    sectionObjects: Participacao[] | TrabalhoEmEventos[],
    quantityDesc: boolean
  ): void {
    // Maps each professor to the quantity of their works in events
    const sectionsByProfessor = this.countSectionsByProfessorUsingAny(
      sectionType,
      professors,
      yersToConsider,
      sectionObjects
    )

    // Sorts the professors by the quantity of works they participated in events
    professors.sort((a, b) => {
      return (
        ((sectionsByProfessor.get(b) || 0) -
          (sectionsByProfessor.get(a) || 0)) *
        (quantityDesc ? 1 : -1)
      )
    })
  }

  countSectionsByProfessorUsingAny(
    sectionType: string,
    professors: string[],
    yersToConsider: string[],
    sectionObjects: Participacao[] | TrabalhoEmEventos[]
  ): Map<string, number> {
    const sectionsByProfessor = new Map<string, number>()

    professors.forEach((professor) => {
      const professorName = professor.toString()

      const quantity = this.countService.countSectionsByProfessorUsingYear(
        professorName,
        yersToConsider,
        sectionObjects
      )

      sectionsByProfessor.set(professorName, quantity)
    })

    return sectionsByProfessor
  }
}
