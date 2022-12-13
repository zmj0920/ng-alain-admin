import { Directive, Host, Optional } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFilterOptionType, NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
  selector: '[ngFilterOption]'
})
export class SelectFilterOptionDirective {
  constructor(@Optional() @Host() public select: NzSelectComponent) {}

  ngOnInit(): void {
    this.select.nzFilterOption = this.filterOption;
  }

  filterOption: NzFilterOptionType = (input?: string, option?: NzSafeAny) => {
    return input && option?.nzLabel?.toString().toLowerCase().includes(input.toLowerCase()) && !option?.nzDisabled;
  };
}
