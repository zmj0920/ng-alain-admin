import { NgModule, Type } from '@angular/core';
import { FullContentModule } from '@delon/abc/full-content';
import { SharedModule } from '@shared';
import { CrudConfigurationItemModalComponent } from './configuration-item-modal/configuration-item-modal.component';
import { CrudRoutingModule } from './crud-routing.module';
import { CrudListComponent } from './list/list.component';
const COMPONENTS: Type<void>[] = [CrudListComponent, CrudConfigurationItemModalComponent];

@NgModule({
  imports: [SharedModule, CrudRoutingModule, FullContentModule],
  declarations: [...COMPONENTS],
})
export class CrudModule {}
