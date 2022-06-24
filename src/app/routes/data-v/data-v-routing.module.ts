import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationsComponent } from './animations/animations.component';
import { ListComponent } from './list/list.component';
import { RelationComponent } from './relation/relation.component';

const routes: Routes = [
  { path: 'relation', component: RelationComponent },
  { path: 'list', component: ListComponent },
  { path: 'animations', component: AnimationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataVRoutingModule {}
