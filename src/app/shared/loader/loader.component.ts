import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {
    this.loaderService.showLoader$.subscribe((showLoader) => {
      this.showLoader = showLoader;
    });
  }

  showLoader = false;
}
