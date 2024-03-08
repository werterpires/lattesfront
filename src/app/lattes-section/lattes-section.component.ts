import { Component } from '@angular/core';
import { ContainerComponent } from '../shared/container/container.component';

@Component({
  selector: 'app-lattes-section',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './lattes-section.component.html',
  styleUrl: './lattes-section.component.css',
})
export class LattesSectionComponent {}
