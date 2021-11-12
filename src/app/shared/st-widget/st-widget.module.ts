import { NgModule } from '@angular/core';
import { STWidgetRegistry } from '@delon/abc/st';

import { SharedModule } from '../shared.module';
import { STImgWidget } from './img.widget';
import { STTooltipWidget } from './tooltip.widget';

export const STWIDGET_COMPONENTS = [STImgWidget, STTooltipWidget];

@NgModule({
  declarations: STWIDGET_COMPONENTS,
  imports: [SharedModule],
  exports: [...STWIDGET_COMPONENTS]
})
export class STWidgetModule {
  constructor(widgetRegistry: STWidgetRegistry) {
    widgetRegistry.register(STImgWidget.KEY, STImgWidget);
    widgetRegistry.register(STTooltipWidget.KEY, STTooltipWidget);
  }
}
