import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { I18NService } from '@core';

@Component({
  selector: 'table-action',
  templateUrl: './table-action.component.html',
  styleUrls: ['./table-action.component.less']
})
export class TableActionComponent implements OnInit {
  @Input() rowActions: any[] = [];
  @Input() moreRowActions: any[] = [];
  @Input() groupActions: any[] = [];
  @Input() selectedRows: any[] = [];
  @Output() refresh = new EventEmitter<boolean>();

  get currentLang(): string {
    return this.i18n.defaultLang;
  }
  constructor(private i18n: I18NService) {}

  ngOnInit(): void {}

  refreshList() {
    this.refresh.emit(true);
  }
}
