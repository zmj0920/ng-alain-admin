import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzButtonType, NzButtonShape, NzButtonSize, NzButtonComponent } from 'ng-zorro-antd/button';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'zm-button',
  styleUrls: [],
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
  @Input() nzType: any = null;
  @Input() nzShape: NzButtonShape = null;
  @Input() nzSize: NzButtonSize = 'default';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.buttonElement.assertIconOnly(this.elementRef.nativeElement, this.renderer);
    this.buttonElement.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
  }
}
