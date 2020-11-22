import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzTableModule
  ],
  exports: [
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzTableModule
  ],
})

export class NgZorroModule {}
