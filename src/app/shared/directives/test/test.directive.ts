import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTest]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    name: 'appTest指令扩展属性'
  }
})
export class TestDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight('red');
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
