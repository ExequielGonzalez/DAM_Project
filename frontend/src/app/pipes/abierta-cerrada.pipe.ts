import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abiertaCerrada'
})
export class AbiertaCerradaPipe implements PipeTransform {

  transform(value: number): string {
    return value? 'ABIERTA':'CERRADA';
  }

}
