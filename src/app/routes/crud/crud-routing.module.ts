import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudListComponent } from './list/list.component';

const routes: Routes = [{ path: 'list', component: CrudListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule {}
