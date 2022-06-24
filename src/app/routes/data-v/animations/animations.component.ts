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
import { fadeInUp, flyIn } from 'src/app/shared/animations/fadeInUp';

const defaultFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
  if (item && item.nzLabel) {
    return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
};

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.less'],
  animations: [flyIn, fadeInUp]
})
export class AnimationsComponent implements OnInit {
  option = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' }
  ];
  constructor() {}

  ngOnInit(): void {}

  chage(val: any) {
    console.log(val);
  }
}
