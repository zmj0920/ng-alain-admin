import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTest]',
  host: {
    name: 'appTest指令扩展属性'
  }
})
export class TestDirective {
  @Input() defaultColor = '';

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'red';
  }

  // @HostListener('mouseenter') onMouseEnter(): void {
  //   this.highlight('yellow');
  // }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight('red');
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
