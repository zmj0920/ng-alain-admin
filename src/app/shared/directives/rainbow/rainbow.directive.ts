import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appRainbow]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(keyup)': 'keyupFun($event.target)',
  },
})
export class RainbowDirective {
  constructor(public elementRef: ElementRef) {}
  possibleColors = [
    'darksalmon',
    'hotpink',
    'lightskyblue',
    'goldenrod',
    'peachpuff',
    'mediumspringgreen',
    'cornflowerblue',
    'blanchedalmond',
    'lightslategrey',
  ];
  @HostBinding('style.color')
  color!: string;
  @HostBinding('style.borderColor')
  borderColor!: string;
  @HostListener('keydown') onKeydown(): void {
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorPick];
  }

  keyupFun(evt: any): void {
    if (evt.value) {
      this.elementRef.nativeElement.value = evt.value.trim();
      console.log(evt.value);
    }
  }
}
