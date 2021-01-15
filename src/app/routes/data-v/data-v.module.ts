import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { DataVRoutingModule } from './data-v-routing.module';
import { RelationComponent } from './relation/relation.component';
import { HeaderComponent } from './header/header/header.component';
import { OperatorsComponent } from './operators/operators.component';
import { ButtonComponent } from './button/button.component';

const COMPONENTS = [RelationComponent];

@NgModule({
  imports: [SharedModule, DataVRoutingModule],
  declarations: [...COMPONENTS, HeaderComponent, OperatorsComponent, ButtonComponent],
})
export class DataVModule {}
