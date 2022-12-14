import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { AnimationsComponent } from './animations/animations.component';
import { DataVRoutingModule } from './data-v-routing.module';
import { HeaderComponent } from './header/header.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { ListComponent } from './list/list.component';
import { NgSelectComponent } from './ng-select/ng-select.component';
import { OperatorsComponent } from './operators/operators.component';
import { RelationComponent } from './relation/relation.component';
import { SizerComponent } from './sizer/sizer.component';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { ZmButtonComponent } from './zm-button/zm-button.component';

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
