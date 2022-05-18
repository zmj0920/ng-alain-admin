import { Directive, Host, Injectable, Input, OnInit, TemplateRef } from '@angular/core';

@Injectable()
export class RenderSource {
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

@Directive({ selector: '[templateRef]' })
export class RenderDirective implements OnInit {
  @Input('templateRef') id!: string;

  @Input() type!: 'title';

  constructor(private ref: TemplateRef<void>, @Host() private source: RenderSource) {}

  ngOnInit(): void {
    this.source.add(this.type, this.id, this.ref);
  }
}
