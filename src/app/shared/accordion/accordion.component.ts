import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
})
export class AccordionComponent {
  @Input() title: string = '';
  @Input() open: boolean = false;
  @Input() quantity: number | null = null;
}
