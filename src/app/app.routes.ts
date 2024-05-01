import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { LattesSectionComponent } from './lattes-section/lattes-section.component'
import { TrablhosEmEventosComponent } from './sections/trablhos-em-eventos/trablhos-em-eventos.component'
import { ProfessorsComponent } from './professors/professors.component'
import { OutrasParticipacoesEmEventosCongressosComponent } from './sections/outras-participacoes-em-Eventos-Congressos/outras-participacoes-em-eventos-congressos.component'
import { ParticipacoesEmEncontrosComponent } from './sections/participacoes-em-encontros/participacoes-em-encontros.component'

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
      }
    ]
  },
  { path: 'professors', component: ProfessorsComponent },
  { path: 'professors/:professorId', component: ProfessorsComponent },
  { path: '', component: LoginComponent }
]
