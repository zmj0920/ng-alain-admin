import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'text-ellipsis',
  template: ` <ng-content></ng-content> `,
  host: {
    style: `display:-webkit-box;
   -webkit-line-clamp:1;
   overflow:hidden;
   -webkit-box-orient:vertical; 
   word-break:break-all;`
  }
})
export class TextComponent {
  @Input()
  @HostBinding('style.-webkit-line-clamp')
  lines: number = 1;

  @Input()
  @HostBinding('style.width')
  width: any = 'auto';
}
