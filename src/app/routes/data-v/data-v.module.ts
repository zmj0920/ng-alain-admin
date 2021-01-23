import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { DataVRoutingModule } from './data-v-routing.module';
import { HeaderComponent } from './header/header.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { OperatorsComponent } from './operators/operators.component';
import { RelationComponent } from './relation/relation.component';
import { ZmButtonComponent } from './zm-button/zm-button.component';

@NgModule({
  imports: [SharedModule, DataVRoutingModule],
  declarations: [RelationComponent, HeaderComponent, OperatorsComponent, NumberInputComponent, ZmButtonComponent],
})
export class DataVModule {}
