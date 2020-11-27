import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sex'})
export class SexPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === 0){
      return '女';
    }
    return '男';
  }

}
