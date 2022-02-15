import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {
  step = 1;
  radioValue = false;

  again(): void {
    this.step = 0;
  }

  constructor() {
    this.again();
  }
}
