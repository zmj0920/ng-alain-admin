import { Component, Input, OnInit } from '@angular/core';
import { STComponent } from '@delon/abc/st';
import { deepCopy } from '@delon/util';

@Component({
  selector: 'table-custom-columns',
  templateUrl: './table-custom-columns.component.html',
  styleUrls: ['./table-custom-columns.component.less']
})
export class TableCustomColumnsComponent implements OnInit {
  private _customColumns!: any[];
  @Input() set customColumns(val: any[]) {
    this.customColumnsCopy = deepCopy(val);
    this._customColumns = val;
  }

  get customColumns() {
    return this._customColumns;
  }
  @Input() st!: STComponent;

  allChecked = true;
  showColumnSetting = false;
  customColumnsCopy!: any[];

  constructor() {}

  ngOnInit(): void {}

  cancelSettingColumn(): void {
    this.showColumnSetting = false;
  }

  restoreColumn() {
    this.customColumnsCopy.map((arr, i) => {
      this.customColumns[i].checked = arr.checked;
    });
    this.st.resetColumns({ emitReload: true });
  }

  updateColumn() {
    this.showColumnSetting = false;
    this.st.resetColumns({ emitReload: true });
  }

  updateAllChecked(): void {
    this.allChecked = !this.allChecked;
    if (this.allChecked) {
      this.customColumns = this.customColumns.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.customColumns = this.customColumns.map(item => ({
        ...item,
        checked: false
      }));
    }
  }

  updateColumnChecked($event: null | boolean, index: number) {
    if ($event === null) {
      this.customColumns[index].checked = !this.customColumns[index].checked;
    }
    const checkeds = this.customColumns.every(i => i.checked);
    if (checkeds) {
      this.allChecked = true;
    } else {
      this.allChecked = false;
    }
  }
}
