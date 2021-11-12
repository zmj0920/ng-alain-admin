import { NgModule, Type } from '@angular/core';
import { G2BarModule } from '@delon/chart/bar';
import { G2CustomModule } from '@delon/chart/custom';
import { SharedModule } from '@shared';

import { ChartCustomComponent } from './chart-custom/chart-custom.component';
import { G2ChartG2ChartBarComponent } from './g2-chart-bar/g2-chart-bar.component';
import { G2ChartRoutingModule } from './g2-chart-routing.module';

const COMPONENTS: Array<Type<void>> = [G2ChartG2ChartBarComponent, ChartCustomComponent];

@NgModule({
  imports: [SharedModule, G2BarModule, G2CustomModule, G2ChartRoutingModule],
  declarations: COMPONENTS
})
export class G2ChartModule {}
