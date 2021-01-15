import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';
import { TranslateModule } from '@ngx-translate/core';

import { SHARED_COMPOENT_MODULES } from './components/shared-component.module';
import { DIRECTIVES_MODULES } from './directives/directive.module';
import { PROVIDERS_PIPES_MODULES } from './pipes/pipe.module';
import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { THIRDMODULES } from './third.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonACLModule,
    DelonFormModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    ...THIRDMODULES,
  ],
  declarations: [...SHARED_COMPOENT_MODULES, ...DIRECTIVES_MODULES, ...PROVIDERS_PIPES_MODULES],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    TranslateModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...SHARED_COMPOENT_MODULES,
    // your directive
    ...DIRECTIVES_MODULES,
    // your pipe
    ...PROVIDERS_PIPES_MODULES,
  ],
})
export class SharedModule {}
