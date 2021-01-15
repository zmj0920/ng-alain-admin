import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'st-widget-tooltip',
  template: `<div nz-tooltip [nzTooltipTitle]="tooltipText" [nzTooltipColor]="'#2db7f5'">{{ tooltipText }}</div> `,
  // host: {
  //   '(click)': 'show()',
  // },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class STTooltipWidget {
  static readonly KEY = 'tooltip';

  tooltipText!: string;
  constructor() {}
}
