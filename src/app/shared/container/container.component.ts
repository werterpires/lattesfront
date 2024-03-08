import { Component } from '@angular/core';
import { CurriculumnsService } from '../services/curriculumns.service';
import { AddCurriculumsComponent } from '../add-curriculums/add-curriculums.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [AddCurriculumsComponent, NgIf],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  add = false;

  constructor(
    private curriculumService: CurriculumnsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.curriculumService.curriculumnsObject.value.length === 0) {
      this.curriculumService.getAllCurriculumns().subscribe();
    }
  }

  redirect(route: string) {
    this.router.navigate([route]);
  }
}
