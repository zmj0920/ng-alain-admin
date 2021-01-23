import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzButtonType, NzButtonShape, NzButtonSize, NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'zm-button',
  templateUrl: './zm-button.component.html'
})
export class ZmButtonComponent implements AfterViewInit, OnInit {

  @ViewChild('buttonElement', { static: true }) buttonElement!: NzButtonComponent;
  @Input() @InputBoolean() nzBlock = false;
  @Input() @InputBoolean() nzGhost = false;
  @Input() @InputBoolean() nzSearch = false;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzDanger = false;
  @Input() @InputBoolean() disabled = false;
  @Input() tabIndex: number | string | null = null;
  @Input() nzType: NzButtonType = null;
  @Input() nzShape: NzButtonShape = null;
  @Input() nzSize: NzButtonSize = 'default';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,

  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buttonElement.assertIconOnly(this.elementRef.nativeElement, this.renderer);
    this.buttonElement.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
  }

}
