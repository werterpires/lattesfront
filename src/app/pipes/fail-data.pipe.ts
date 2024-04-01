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
      //transforma em string separada por vírgula e espaço, mas deve eliminar os espaços extras
      return value
        .map((value) => value.trim())
        .filter((value) => value.length > 0)
        .join(', ');
    }

    return value;
  }
}
