import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs/internal/operators';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value==0){
      return '女'
    }
    return '男';
  }

}
