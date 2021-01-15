import { NgModule } from '@angular/core';
import { STWidgetRegistry } from '@delon/abc/st';
import { SharedModule } from '../shared.module';
import { STTooltipWidget } from './tooltip.widget';

export const STWIDGET_COMPONENTS = [STTooltipWidget];

@NgModule({
  declarations: STWIDGET_COMPONENTS,
  imports: [SharedModule],
  exports: [...STWIDGET_COMPONENTS],
})
export class STWidgetModule {
  constructor(widgetRegistry: STWidgetRegistry) {
    widgetRegistry.register(STTooltipWidget.KEY, STTooltipWidget);
  }
}
