import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective {

  constructor(private el: ElementRef) { 
    el.nativeElement.style.backgroundColor = 'red';
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
 
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('red');
  }
 
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
