import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import {
  NzFilterOptionType,
  NzSelectComponent,
  NzSelectItemInterface,
  NzSelectModeType,
  NzSelectOptionInterface,
  NzSelectSizeType
} from 'ng-zorro-antd/select';

const defaultFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
  if (item && item.nzLabel) {
    return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
};

@Component({
  selector: 'ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.less']
})
export class NgSelectComponent implements OnInit {
  @ViewChild('nzSelect', { static: true }) nzSelect!: NzSelectComponent;
  @Input() selectAllText = '全选';
  @Input() option: any[] = [];
  @Input() nzId: string | null = null;
  @Input() nzSize: NzSelectSizeType = 'default';
  @Input() nzOptionHeightPx = 32;
  @Input() nzOptionOverflowSize = 8;
  @Input() nzDropdownClassName: string | null = null;
  @Input() nzDropdownMatchSelectWidth = true;
  @Input() nzDropdownStyle: { [key: string]: string } | null = null;
  @Input() nzNotFoundContent: string | TemplateRef<NzSafeAny> | undefined = undefined;
  @Input() nzPlaceHolder: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzMaxTagCount = Infinity;
  @Input() nzDropdownRender: TemplateRef<NzSafeAny> | null = null;
  @Input() nzCustomTemplate: TemplateRef<{ $implicit: NzSelectItemInterface }> | null = null;
  @Input()
  @WithConfig<TemplateRef<NzSafeAny> | string | null>()
  nzSuffixIcon: TemplateRef<NzSafeAny> | string | null = null;
  @Input() nzClearIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() nzRemoveIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() nzMenuItemSelectedIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() nzTokenSeparators: string[] = [];
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: NzSafeAny[] }> | null = null;
  @Input() nzMaxMultipleCount = Infinity;
  @Input() nzMode: NzSelectModeType = 'default';
  @Input() nzFilterOption: NzFilterOptionType = defaultFilterOption;
  @Input() compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  @Input() @InputBoolean() nzAllowClear = false;
  @Input() @WithConfig<boolean>() @InputBoolean() nzBorderless = false;
  @Input() @InputBoolean() nzShowSearch = false;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() @InputBoolean() nzAutoClearSearchValue = true;
  @Input() @InputBoolean() nzServerSearch = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzOpen = false;
  @Input() @WithConfig<boolean>() @InputBoolean() nzBackdrop = false;
  @Input() nzOptions: NzSelectOptionInterface[] = [];
  @Output() onChange = new EventEmitter<any>();
  checked = false;
  selectedArray: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  selectAll(checked: boolean) {
    const selected: any[] = [];
    if (checked) {
      this.option.map(item => {
        if (!this.selectedArray.includes(item.value)) {
          selected.push(item.value);
        }
      });
      this.selectedArray = this.selectedArray.concat(selected);
    } else {
      this.selectedArray = [];
    }
    this.checked = checked;
    this.onChange.emit(this.selectedArray);
  }

  changeSelect(value: any) {
    if (value.length === this.option.length) {
      this.checked = true;
    } else {
      this.checked = false;
    }
    this.onChange.emit(this.selectedArray);
  }

  writeValue(value: NzSafeAny | NzSafeAny[]): void {
    this.nzSelect.writeValue(value);
  }

  registerOnChange(fn: OnChangeType): void {
    this.nzSelect.registerOnChange(fn);
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.nzSelect.registerOnTouched(fn);
  }
}
