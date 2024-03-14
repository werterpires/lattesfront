import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterObject } from './types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.css',
})
export class FilterInputComponent {
  @Output() filterEvent = new EventEmitter<FilterObject>();

  @Input() filter: FilterObject = {
    text: [],
    disjunctive: true,
  };

  getText(text: string) {
    const newText: string[] = [];

    const regex = /"([^"]*)"/g;
    const regexIntervalo = /\b(\d+)-(\d+)\b/g;

    const trechosAspas = text.match(regex);
    text = text.replace(regex, '');
    if (trechosAspas) newText.push(...trechosAspas);

    text = text.replace(regexIntervalo, (match, inicio, fim) => {
      const inicioNum = parseInt(inicio);
      const fimNum = parseInt(fim);
      if (
        !isNaN(inicioNum) &&
        !isNaN(fimNum) &&
        fimNum > inicioNum &&
        fimNum - inicioNum <= 50
      ) {
        for (let i = inicioNum; i <= fimNum; i++) {
          newText.push(i.toString());
        }
        return '';
      } else {
        return match;
      }
    });

    const trechosRestantes = text
      .split(/\s+/)
      .filter((trecho) => trecho.trim());
    newText.push(...trechosRestantes);

    this.filter.text = newText;
  }
}
