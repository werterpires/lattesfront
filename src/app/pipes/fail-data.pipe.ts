import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'failData',
  standalone: true,
})
export class FailDataPipe implements PipeTransform {
  transform(value: string | string[] | undefined): unknown {
    if (value === undefined || value.length === 0) {
      return 'Não informado';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }

    return value;
  }
}
