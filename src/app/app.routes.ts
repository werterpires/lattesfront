import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LattesSectionComponent } from './lattes-section/lattes-section.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sections', component: LattesSectionComponent },
  { path: '', component: LoginComponent },
];
