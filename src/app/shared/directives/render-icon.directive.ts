import { Directive, Host, Injectable, Input, OnInit, TemplateRef } from '@angular/core';

@Injectable()
export class RenderIconSource {
  private titles: { [key: string]: TemplateRef<void> } = {};
  private rows: { [key: string]: TemplateRef<void> } = {};

  add(type: string, path: string, ref: TemplateRef<void>): void {
    this[type === 'title' ? 'titles' : 'rows'][path] = ref;
  }

  getTitle(path: string): TemplateRef<void> {
    return this.titles[path];
  }

  getRow(path: string): TemplateRef<void> {
    return this.rows[path];
  }
}

@Directive({ selector: '[render-icon]' })
export class RenderIconDirective implements OnInit {
  @Input('render-icon') id!: string;

  @Input()
  type!: 'title';

  constructor(private ref: TemplateRef<void>, @Host() private source: RenderIconSource) {}

  ngOnInit(): void {
    this.source.add(this.type, this.id, this.ref);
  }
}
