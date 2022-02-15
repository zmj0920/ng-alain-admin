import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { I18NService } from '@core';
import { STChange, STColumn, STComponent, STData, _STColumn } from '@delon/abc/st';
import { XlsxService } from '@delon/abc/xlsx';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, tap } from 'rxjs/operators';
import { TColumnSource } from 'src/app/shared/components/ng-table/tcolumn-source.service';
import { TRowSource } from '../../directives/t-row.directive';

@Component({
  selector: 'ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.less'],
  providers: [TRowSource, TColumnSource],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgTableComponent implements OnInit {
  @Input() st!: STComponent;
  @Input() displayActionsLimit = 4;
  @Input() tableHeaderActions!: any[];
  @Input() data: any[] = [];
  @Input() columns: STColumn[] = [];
  @Input() customColumns: any[] = [];
  @Input() groupActions: any[] = [];
  @Output() refresh = new EventEmitter<boolean>();
  @Output() export = new EventEmitter<boolean>();
  rowActions: any[] = [];
  moreRowActions: any[] = [];
  @Input() selectedRows: STData[] = [];

  get currentLang(): string {
    return this.i18n.defaultLang;
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _hasHostAttributes(...attributes: string[]) {
    attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }

  readonly isRoundButton: boolean = this._hasHostAttributes('mat-fab');

  constructor(
    private columnSource: TColumnSource,
    private cdr: ChangeDetectorRef,
    private i18n: I18NService,
    public _elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    console.log(this.isRoundButton);
  }

  refreshList(): void {
    this.refresh.emit(true);
  }

  stChange(e: STChange): void {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.refreshList();
        break;
    }
  }

  isChoose(key: string): boolean {
    return !!this.customColumns.find(w => w.value === key && w.checked);
  }

  exportXlsx(): void {
    this.export.emit(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tableHeaderActions) {
      const tableHeaderActions: any = changes.tableHeaderActions.currentValue;
      this.tableHeaderActionsChanges(tableHeaderActions);
    }
  }
  ngAfterViewInit(): void {
    this.columnSource.restoreAllRender(this.tableHeaderActions);
    this.columnSource.restoreGroupsColumns(this.groupActions);
  }

  private tableHeaderActionsChanges(tableHeaderActions: any) {
    if (tableHeaderActions.length > this.displayActionsLimit) {
      this.rowActions = tableHeaderActions.slice(0, this.displayActionsLimit);
      this.moreRowActions = tableHeaderActions.slice(this.displayActionsLimit);
    } else {
      this.rowActions = tableHeaderActions;
      this.moreRowActions = [];
    }
  }
}
