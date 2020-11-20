import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@/app/pages/layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent }, // 默认路由
  { path: 'login', component: LayoutComponent }, // 默认路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
