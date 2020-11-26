import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { DirectiveModule } from '@core/directive';
import { PipeModule } from '@core/pipe';
import { ServicesModule } from '@core/services';
import { I18NService } from './i18n/i18n.service';


@NgModule({
  imports: [
    ServicesModule,
    PipeModule,
    DirectiveModule
  ],
  providers: [
    I18NService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
