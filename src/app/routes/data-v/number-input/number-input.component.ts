import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ],
})
export class NumberInputComponent implements OnInit, ControlValueAccessor {
  @Output() readonly nzBlur = new EventEmitter();
  @Output() readonly nzFocus = new EventEmitter();
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzMin = -Infinity;
  @Input() nzMax = Infinity;
  @Input() nzParser = (value: string) =>
    value
      .trim()
      .replace(/。/g, '.')
      .replace(/[^\w\.-]+/g, '')
  @Input() nzPrecision?: number;
  @Input() nzPrecisionMode: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number) = 'toFixed';
  @Input() nzPlaceHolder = '';
  @Input() nzStep = 1;
  @Input() nzInputMode = 'decimal';
  @Input() nzId: string | null = null;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() nzFormatter: (value: number) => string | number = value => value;
  @ViewChild('inputElement', { static: true }) inputElement!: NzInputNumberComponent;

  constructor() {

  }
  writeValue(obj: any): void {
    this.inputElement.writeValue(obj);
  }
  registerOnChange(fn: any): void {
    this.inputElement.registerOnChange(fn);
  }
  registerOnTouched(fn: any): void {
    this.inputElement.registerOnTouched(fn);
  }


  ngOnInit(): void {

  }

}
