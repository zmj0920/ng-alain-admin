import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ng-tabs',
  templateUrl: './ng-tabs.component.html',
  styleUrls: ['./ng-tabs.component.less']
})
export class NgTabsComponent implements OnInit {
  tabSelectedIndex = 0;
  @Output() tabClick = new EventEmitter<number>();
  @Input() tabs: any[] = [
    {
      name: 'Tab1'
    },
    {
      name: 'Tab2',
      selected: true
    },
    {
      name: 'Tab3',
      disabled: () => {
        return true;
      }
    }
  ];
  constructor() {}

  ngOnInit(): void {}

  clickTab(index: number) {
    this.tabClick.emit(index);
  }
}
