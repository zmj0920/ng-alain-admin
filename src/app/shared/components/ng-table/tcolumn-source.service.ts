import { Host, Injectable, TemplateRef } from '@angular/core';
import { TRowSource } from '../../directives/t-row.directive';

@Injectable()
export class TColumnSource {
  constructor(@Host() private rowSource: TRowSource) {}

  private restoreRender(item: any): void {
    if (item.renderIcon) {
      item.__renderIcon =
        typeof item.renderIcon === 'string' ? this.rowSource.getRow(item.renderIcon) : (item.renderIcon as TemplateRef<void>);
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
