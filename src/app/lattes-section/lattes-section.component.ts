import { Component, Input } from '@angular/core'
import { ContainerComponent } from '../shared/container/container.component'
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router'
import { CurriculumnsService } from '../shared/services/curriculumns.service'
import { ICurriculum } from '../shared/services/types'
import { NgFor, NgIf } from '@angular/common'

@Component({
  selector: 'app-lattes-section',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterOutlet,
    NgIf,
    NgFor,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './lattes-section.component.html',
  styleUrl: './lattes-section.component.css'
})
export class LattesSectionComponent {
  curriculums: ICurriculum[] = []
  sections: Array<{ name: string; route: string }> = [
    { name: 'Apresentações de trabahos', route: 'presentationofworks' },
    { name: 'Artigos aceitos para publicação', route: 'acceptedarticles' },
    {
      name: 'Cursos de curta duração ministrados',
      route: 'shorttermcourses'
    },
    {
      name: 'Desenvolvimento de material didático ou instrucional',
      route: 'educationalmaterials'
    },
    { name: 'Editorações', route: 'editorialwork' },
    {
      name: 'Mídias sociais, websites e blogs',
      route: 'socialmediaswebsitesblogs'
    },
    { name: 'Organizações de eventos', route: 'eventsorganizations' },
    {
      name: 'Outras participações em eventos e congressos',
      route: 'otherevents'
    },
    {
      name: 'Outras produções bibliográficas',
      route: 'otherbibliographicworks'
    },
    { name: 'Outras produções técnicas', route: 'othertechnicalproductions' },
    { name: 'Programas de Radio ou TV', route: 'radioortvprogram' },
    { name: 'Participações em congresos', route: 'congresssparticipations' },
    { name: 'Participações em encontros', route: 'meetingsparticipations' },
    { name: 'Participações em simpósios', route: 'symposiumsparticipations' },
    { name: 'Participações em seminarios', route: 'seminarparticipations' },
    { name: 'Trabalhos em eventos', route: 'eventsworks' }
  ]

  @Input() sectionsPage: boolean = true
  @Input() head = true
  sectionsToShow = this.sections
  filterString: string = ''
  outlet: boolean = false

  title = ''
  constructor(
    private readonly curriculumService: CurriculumnsService,
    public router: Router
  ) {
    this.curriculumService.curriculumns$.subscribe((curriculumns) => {
      this.curriculums = curriculumns
    })

    this.changeTitleWheRouteChange()
  }

  ngOnInit(): void {
    if (this.router.url.endsWith('/sections') || !this.sectionsPage) {
      this.outlet = false
    } else {
      this.outlet = true
      this.title =
        this.sections.find(
          (section) => section.route === this.router.url.split('/')[2]
        )?.name || ''
    }
  }

  filterObjects(): void {
    const filter = this.filterString.toLowerCase().split(' ')
    this.sectionsToShow = this.sections.filter((section) => {
      return filter.some((fil) => {
        return section.name.toLowerCase().includes(fil)
      })
    })
  }

  changeTitleWheRouteChange(): void {
    // criar um escutador para as alterações de rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title =
          this.sections.find(
            (section) => section.route === this.router.url.split('/')[2]
          )?.name || ''
      }
    })
  }
}
