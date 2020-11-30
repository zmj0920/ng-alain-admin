import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'red';
  }
  // tslint:disable-next-line: typedef
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  // tslint:disable-next-line: typedef
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('red');
  }

  // tslint:disable-next-line: typedef
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}