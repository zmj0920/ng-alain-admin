import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { DataVRoutingModule } from './data-v-routing.module';
import { HeaderComponent } from './header/header.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { OperatorsComponent } from './operators/operators.component';
import { RelationComponent } from './relation/relation.component';
import { ZmButtonComponent } from './zm-button/zm-button.component';
import { ListComponent } from './list/list.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { AnimationsComponent } from './animations/animations.component';
import { NgSelectComponent } from './ng-select/ng-select.component';
import { SizerComponent } from './sizer/sizer.component';

const COMPONENTS = [
  RelationComponent,
  HeaderComponent,
  OperatorsComponent,
  InputNumberComponent,
  ZmButtonComponent,
  ListComponent,
  VirtualScrollComponent,
  AnimationsComponent,
  NgSelectComponent
];

@NgModule({
  imports: [SharedModule, DataVRoutingModule],
  declarations: [...COMPONENTS, SizerComponent]
})
export class DataVModule {}
