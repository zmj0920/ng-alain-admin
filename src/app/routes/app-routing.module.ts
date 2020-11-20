import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from '../pages/layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent} , // 默认路由
  { path: 'login', component: LayoutComponent}, // 默认路由
  { path: 'welcome', loadChildren: () => import('../pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
