import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@component//layout/layout.component';
import { WelcomeComponent } from '@pages/welcome/welcome.component';


const routes: Routes = [
  { path: '', component: LayoutComponent }, // 默认路由
  { path: 'login', component: LayoutComponent }, // 默认路由
  { path: 'welcome', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
