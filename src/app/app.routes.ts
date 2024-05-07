import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { LattesSectionComponent } from './lattes-section/lattes-section.component'
import { TrablhosEmEventosComponent } from './sections/trablhos-em-eventos/trablhos-em-eventos.component'
import { ProfessorsComponent } from './professors/professors.component'
import { OutrasParticipacoesEmEventosCongressosComponent } from './sections/outras-participacoes-em-Eventos-Congressos/outras-participacoes-em-eventos-congressos.component'
import { ParticipacoesEmEncontrosComponent } from './sections/participacoes-em-encontros/participacoes-em-encontros.component'
import { ParticipacoesEmSimposiosComponent } from './sections/participacoes-em-simposios/participacoes-em-simposios.component'
import { ParticipacoesEmSeminariosComponent } from './sections/participacoes-em-seminarios/participacoes-em-seminarios.component'
import { ParticipacoesEmCongressosComponent } from './sections/participacoes-em-congressos/participacoes-em-congressos.component'
import { OutrasProducoesTecnicasComponent } from './sections/outras-producoes-tecnicas/outras-producoes-tecnicas.component'
import { MidiasSociaisWebsitesBlogsComponent } from './sections/midia-social-website-blog/midia-social-website-blog.component'
import { ProgramasDeRadioOuTVComponent } from './sections/programa-de-radio-ou-tv/programa-de-radio-ou-tv.component'
import { OrganizacoesDeEventosComponent } from './sections/organizacao-de-eventos/organizacao-de-eventos.component'
import { EditoracoesComponent } from './sections/editoracao/editoracao.component'
import { DesenvolvimentoDeMaterialDidaticoOUInstrucionalComponent } from './sections/desenvolvimento-de-material-didatico/desenvolvimento-de-material-didatico.component'
import { CursosDeCurtaDuracaoMinistradosComponent } from './sections/curso-de-curta-duracao-ministrado/curso-de-curta-duracao-ministrado.component'
import { ApresentacoesDeTrabalhoComponent } from './sections/apresentacao-de-trabalho/apresentacao-de-trabalho.component'
import { ArtigosAceitosParaPublicacaoComponent } from './sections/artigo-aceito-para-publicacao/apresentacao-de-trabalho.component'
import { OutrasProducoesBibliograficasComponent } from './sections/outras-producoes-bibliograficas/outras-producoes-bibliograficas.component'
import { TextosEmJornaisOuRevistasComponent } from './sections/textos-em-jornais-ou-revistas/textos-em-jornais-ou-revistas.component'
import { CapitulosDeLivrosPublicadosComponent } from './sections/capitulos-de-livros-publicados/capitulos-de-livros-publicados.component'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'sections',
    component: LattesSectionComponent,
    children: [
      {
        path: 'eventsworks',
        component: TrablhosEmEventosComponent
      },
      {
        path: 'otherevents',
        component: OutrasParticipacoesEmEventosCongressosComponent
      },
      {
        path: 'meetingsparticipations',
        component: ParticipacoesEmEncontrosComponent
      },
      {
        path: 'symposiumsparticipations',
        component: ParticipacoesEmSimposiosComponent
      },
      {
        path: 'seminarparticipations',
        component: ParticipacoesEmSeminariosComponent
      },
      {
        path: 'congresssparticipations',
        component: ParticipacoesEmCongressosComponent
      },
      {
        path: 'othertechnicalproductions',
        component: OutrasProducoesTecnicasComponent
      },
      {
        path: 'socialmediaswebsitesblogs',
        component: MidiasSociaisWebsitesBlogsComponent
      },
      { path: 'radioortvprogram', component: ProgramasDeRadioOuTVComponent },
      {
        path: 'eventsorganizations',
        component: OrganizacoesDeEventosComponent
      },
      { path: 'editorialwork', component: EditoracoesComponent },
      {
        path: 'educationalmaterials',
        component: DesenvolvimentoDeMaterialDidaticoOUInstrucionalComponent
      },
      {
        path: 'shorttermcourses',
        component: CursosDeCurtaDuracaoMinistradosComponent
      },
      {
        path: 'presentationofworks',
        component: ApresentacoesDeTrabalhoComponent
      },
      {
        path: 'acceptedarticles',
        component: ArtigosAceitosParaPublicacaoComponent
      },
      {
        path: 'otherbibliographicworks',
        component: OutrasProducoesBibliograficasComponent
      },
      {
        path: 'textsinjournalsormagazines',
        component: TextosEmJornaisOuRevistasComponent
      },
      {
        path: 'publishedbookChapters',
        component: CapitulosDeLivrosPublicadosComponent
      }
    ]
  },
  { path: 'professors', component: ProfessorsComponent },
  { path: 'professors/:professorId', component: ProfessorsComponent },
  { path: '', component: LoginComponent }
]
