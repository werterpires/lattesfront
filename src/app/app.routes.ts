import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LattesSectionComponent } from './lattes-section/lattes-section.component';
import { TrablhosEmEventosComponent } from './sections/trablhos-em-eventos/trablhos-em-eventos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'sections',
    component: LattesSectionComponent,
    children: [
      {
        path: 'eventsworks',
        component: TrablhosEmEventosComponent,
      },
    ],
  },
  { path: '', component: LoginComponent },
];
