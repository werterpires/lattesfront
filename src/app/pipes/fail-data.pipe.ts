import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'failData',
  standalone: true,
})
export class FailDataPipe implements PipeTransform {
  transform(value: string | undefined): unknown {
    if (value === undefined || value.length === 0) {
      return 'Não informado';
    }
    return value;
  }
}
