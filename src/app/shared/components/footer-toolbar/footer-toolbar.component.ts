import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

const CLSBODY = 'footer-toolbar__body';

@Component({
  selector: 'ecs-footer-toolbar',
  exportAs: 'ecsfooterToolbar',
  templateUrl: './footer-toolbar.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FooterToolbarComponent implements OnInit, OnDestroy {
  @Input()
  extra!: string | TemplateRef<void>;

  constructor(private el: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private doc: any) {}

  private get bodyCls(): DOMTokenList {
    return (this.doc.querySelector('body') as HTMLElement).classList;
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'footer-toolbar');
    this.bodyCls.add(CLSBODY);
  }

  ngOnDestroy(): void {
    this.bodyCls.remove(CLSBODY);
  }
}
