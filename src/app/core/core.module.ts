import { NgModule } from '@angular/core';
import { ServicesModule } from '@core/services';
import { PipeModule } from '@core/pipe';
import { DirectiveModule } from '@core/directive';

@NgModule({
  imports: [
    ServicesModule,
    PipeModule,
    DirectiveModule
  ],
  providers: [],
})
export class CoreModule { }
