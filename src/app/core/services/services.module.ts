import { NgModule } from '@angular/core';

import { BookService } from './book/book.service';
import { NgModalHelperService } from './ng-modal-helper.service';

@NgModule({
  providers: [BookService, NgModalHelperService]
})
export class ServicesModule {}
