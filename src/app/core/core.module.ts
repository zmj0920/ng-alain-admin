import { NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ServicesModule } from '@core/services';

@NgModule({
  imports: [ServicesModule],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
