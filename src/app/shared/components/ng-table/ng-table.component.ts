import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { I18NService } from '@core';
import { STColumn, STComponent, STData, _STColumn } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { TColumnSource } from 'src/app/shared/components/ng-table/tcolumn-source.service';
import { RenderIconSource } from '../../directives/render-icon.directive';

@Component({
  selector: 'ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.less'],
  providers: [RenderIconSource, TColumnSource],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgTableComponent implements OnInit {
  @Input() columns: STColumn[] = [];
  @Input() customColumns: any[] = [];
  @Input() data: any[] = [];
  @Input() displayActionsLimit = 4;
  @Input() exportOptions = { show: false, exportXlsx: () => {} };
  @Input() groupActions: any[] = [];
  @Input() globalActions: any[] = [];
  @Input() tableHeaderActions!: any[];
  rowActions: any[] = [];
  moreRowActions: any[] = [];
  @Input() selectedRows: STData[] = [];
  @Input() showSetupColumn = false;
  @Input() st!: STComponent;
  @Input() filterFacets: any[] = [];

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _hasHostAttributes(...attributes: string[]) {
    attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }

  readonly isRoundButton: boolean = this._hasHostAttributes('mat-fab');

  constructor(private columnSource: TColumnSource, private i18n: I18NService, public _elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.isRoundButton);
  }

  ngOnChanges(changes: any) {
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
