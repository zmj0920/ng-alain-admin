import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ServicesModule } from '@core/services';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [ServicesModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
