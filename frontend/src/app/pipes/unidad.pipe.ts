import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidad'
})
export class UnidadPipe implements PipeTransform {
// This pipe returns the unit type of a variable.

  transform(value: number, of: string): string {
    if(of === 'Presion') {
      return value + ' Cb KPa';
    }
    return '';
  }

}
