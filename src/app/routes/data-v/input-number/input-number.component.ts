import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';

export type OnChangeType = any;

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})
export class InputNumberComponent implements OnInit, ControlValueAccessor {
  constructor() {}
  @Output() readonly nzBlur = new EventEmitter();
  @Output() readonly nzFocus = new EventEmitter();
  @ViewChild('inputElement', { static: true }) inputElement!: NzInputNumberComponent;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzMin = -Infinity;
  @Input() nzMax = Infinity;
  @Input() nzPrecision?: number;
  @Input() nzPrecisionMode: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number) = 'toFixed';
  @Input() nzPlaceHolder = '';
  @Input() nzStep = 1;
  @Input() nzInputMode = 'decimal';
  @Input() nzId: string | null = null;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() @InputBoolean() nzError = false;
  @Input() nzParser = (value: string) =>
    value
      .trim()
      .replace(/。/g, '.')
      .replace(/[^\w\.-]+/g, '');
  @Input() nzFormatter: (value: number) => string | number = value => value;

  writeValue(value: number): void {
    this.inputElement.writeValue(value);
  }

  registerOnChange(fn: OnChangeType): void {
    this.inputElement.registerOnChange(fn);
  }

  registerOnTouched(fn: OnChangeType): void {
    this.inputElement.registerOnTouched(fn);
  }

  ngOnInit(): void {}
}
