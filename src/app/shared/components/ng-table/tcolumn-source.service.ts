import { Host, Injectable, TemplateRef } from '@angular/core';
import { RenderIconSource } from '../../directives/render-icon.directive';

@Injectable()
export class TColumnSource {
  constructor(@Host() private renderIconSource: RenderIconSource) {}

  private restoreRender(item: any): void {
    if (item.renderIcon) {
      item.__renderIcon =
        typeof item.renderIcon === 'string' ? this.renderIconSource.getRow(item.renderIcon) : (item.renderIcon as TemplateRef<void>);
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
