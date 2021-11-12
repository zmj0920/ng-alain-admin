import { NgModule, Type } from '@angular/core';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { FullContentModule } from '@delon/abc/full-content';
import { SharedModule } from '@shared';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudListComponent } from './list/list.component';
const COMPONENTS: Array<Type<void>> = [CrudListComponent];

@NgModule({
  imports: [SharedModule, CrudRoutingModule, FullContentModule, EllipsisModule],
  declarations: [...COMPONENTS]
})
export class CrudModule {}
