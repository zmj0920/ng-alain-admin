import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

type NzLegacyButtonType = 'primary' | 'default' | 'dashed' | 'danger' | 'link' | 'text' | null;

export type NzButtonType = NzLegacyButtonType;

@Component({
  selector: 'button[app-button], a[app-button]',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./button.component.less'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <!-- <i nz-icon nzType="loading" *ngIf="nzLoading"></i> -->
    <ng-content></ng-content>
  `,
  host: {
    '[class.btn-primary]': `appButtonType === 'primary'`,
  },
})
export class ButtonComponent implements OnInit {
  @Input() appButtonType: NzButtonType = null;

  constructor(private elementRef: ElementRef) {
    // 添加默认样式
    this.elementRef.nativeElement.classList.add('ant-btn');
  }

  ngOnInit(): void {}
}
