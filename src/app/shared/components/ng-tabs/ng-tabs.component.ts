/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ng-tabs',
  templateUrl: './ng-tabs.component.html',
  styleUrls: ['./ng-tabs.component.less']
})
export class NgTabsComponent implements OnInit {
  @Input() tabSelectedIndex = 0;
  @Output() readonly tabClick = new EventEmitter<any>();
  @Input() tabs: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  clickTab(tab: any, tabSelectedIndex: number) {
    this.tabClick.emit({ tab, tabSelectedIndex });
  }
}
