import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { I18NService } from '@core';

@Component({
  selector: 'button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.less']
})
export class ButtonActionComponent implements OnInit {
  @Input() rowActions: any[] = [];
  @Input() moreRowActions: any[] = [];
  @Input() groupActions: any[] = [];
  @Input() globalActions: any[] = [];
  @Input() selectedRows: any[] = [];
  @Input() btnType: string = 'default';
  // @Output() refresh = new EventEmitter<boolean>();

  get currentLang(): string {
    return this.i18n.defaultLang;
  }
  constructor(private i18n: I18NService) {}
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  // refreshList() {
  //   this.refresh.emit(true);
  // }
}
