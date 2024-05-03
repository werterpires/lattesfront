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
      }
    ]
  },
  { path: 'professors', component: ProfessorsComponent },
  { path: 'professors/:professorId', component: ProfessorsComponent },
  { path: '', component: LoginComponent }
]
