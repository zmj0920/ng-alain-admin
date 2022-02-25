import { NgModule, Type } from '@angular/core';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { FullContentModule } from '@delon/abc/full-content';
import { SharedModule } from '@shared';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudListComponent } from './list/list.component';
import { CaptchaInputComponent } from './captcha-input/captcha-input.component';
import { StepFormComponent } from './step-form/step-form.component';
import { BindMobileComponent } from './bind-mobile/bind-mobile.component';
const COMPONENTS: Array<Type<void>> = [CrudListComponent, StepFormComponent];

@NgModule({
  imports: [SharedModule, CrudRoutingModule, FullContentModule, EllipsisModule],
  declarations: [...COMPONENTS, CaptchaInputComponent, BindMobileComponent]
})
export class CrudModule {}
