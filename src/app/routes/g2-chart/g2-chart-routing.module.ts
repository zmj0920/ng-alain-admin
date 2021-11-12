import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { G2ChartG2ChartBarComponent } from './g2-chart-bar/g2-chart-bar.component';

const routes: Routes = [{ path: 'g2-chart-bar', component: G2ChartG2ChartBarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class G2ChartRoutingModule {}
