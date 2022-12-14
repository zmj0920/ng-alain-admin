import { Host, Injectable, TemplateRef } from '@angular/core';

import { RenderSource } from '../../directives/render.directive';

@Injectable()
export class TColumnSource {
  constructor(@Host() private render: RenderSource) {}

  private restoreRender(item: any): void {
    if (item.renderIcon) {
      item.__renderIcon =
        typeof item.renderIcon === 'string' ? this.render.getRow(item.renderIcon) : (item.renderIcon as TemplateRef<void>);
    }
    if (item.renderTitle) {
      console.log(item.renderTitle);
      item.__renderTitle =
        typeof item.renderTitle === 'string' ? this.render.getRow(item.renderTitle) : (item.renderTitle as TemplateRef<void>);
    }
    if (item.render) {
      item.__render = typeof item.render === 'string' ? this.render.getRow(item.render) : (item.render as TemplateRef<void>);
    }
  }

  restoreAllRender(columns: any[]): void {
    columns.forEach(i => this.restoreRender(i));
  }

  restoreGroupsColumns(columns: any[]): void {
    columns.forEach(i => {
      if (i.children) {
        i.children.forEach((item: any) => this.restoreRender(item));
      }
    });
  }
}
