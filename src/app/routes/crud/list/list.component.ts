import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { I18NService } from '@core';
import { STChange, STColumn, STColumnBadge, STComponent, STData, _STColumn } from '@delon/abc/st';
import { XlsxService } from '@delon/abc/xlsx';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { tap } from 'rxjs/operators';
import { ArrayService } from '@delon/util/array';

@Component({
  selector: 't-table',
  templateUrl: './list.component.html',
  styleUrls: ['./list.less']
})
export class CrudListComponent implements OnInit {
  @ViewChild('st', { static: true }) st!: STComponent;
  @ViewChild('myBox', { static: true }) myBox: any;
  data: any[] = [];
  globalActions = [
    {
      disabled: (data: any) => {
        return data.some((i: { key: number }) => i.key === 2);
      },
      icon: '',
      renderIcon: 'reload',
      onClick: (data: any) => {
        console.log(data);
      },
      text: '',
      tooltip: ''
    }
  ];
  moreRowActions: any[] = [
    {
      disabled: (data: any) => {
        return data.some((i: { key: number }) => i.key === 2);
      },
      icon: 'rowAction1',
      renderIcon: 'setting',
      onClick: (data: any) => {
        console.log(data);
      },
      text: 'rowAction1',
      tooltip: 'rowAction1'
    },
    {
      disabled: (data: any) => false,
      icon: 'rowAction2',
      renderIcon: 'vertical-align-bottom',
      onClick: (data: any) => {},
      text: 'rowAction2',
      tooltip: 'rowAction2'
    },
    {
      disabled: (data: any) => false,
      icon: 'rowAction3',
      renderIcon: 'plus',
      onClick: (data: any) => {},
      text: 'rowAction3',
      tooltip: 'rowAction3'
    }
    // {
    //   disabled: (data: any) => {
    //     return data.some((i: { key: number }) => i.key === 2);
    //   },
    //   icon: 'rowAction4',
    //   renderIcon: 'plus',
    //   onClick: (data: any) => {
    //     console.log(data);
    //   },
    //   text: 'rowAction4',
    //   tooltip: 'rowAction4'
    // },
    // {
    //   disabled: (data: any) => {
    //     return data.some((i: { key: number }) => i.key === 2);
    //   },
    //   icon: 'rowAction5',
    //   renderIcon: 'setting',
    //   onClick: (data: any) => {
    //     console.log(data);
    //   },
    //   text: 'rowAction5',
    //   tooltip: 'rowAction5'
    // },
    // {
    //   disabled: (data: any) => {
    //     return data.some((i: { key: number }) => i.key === 2);
    //   },
    //   icon: 'rowAction6',
    //   renderIcon: 'vertical-align-bottom',
    //   onClick: (data: any) => {
    //     console.log(data);
    //   },
    //   text: 'rowAction6',
    //   tooltip: 'rowAction6'
    // }
  ];
  loading = false;
  selectedRows: STData[] = [];

  q: {
    pi: number;
    ps: number;
    no: string;
    sorter: string;
    status: number | null;
    statusList: NzSafeAny[];
  } = {
    pi: 1,
    ps: 10,
    no: '',
    sorter: '',
    status: null,
    statusList: []
  };
  BADGE: STColumnBadge = {
    0: { text: '关闭', color: 'default' },
    1: { text: '成功', color: 'success' },
    2: { text: '错误', color: 'error' },
    3: { text: '进行中', color: 'processing' },
    4: { text: '默认', color: 'default' },
    5: { text: '警告', color: 'warning' }
  };
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    {
      title: '规则编号',
      index: 'no',
      type: 'link',
      click: data => {
        console.log(data);
      },
      // type: 'widget',
      // widget: { type: 'tooltip', params: ({ record }) => ({ tooltipText: record.no }) },
      iif: () => this.isChoose('no')
    },
    { title: '描述', index: 'description', iif: () => this.isChoose('description') },
    {
      title: { text: '佣金', optional: '（单位：元）', optionalHelp: '计算公式=订单金额 * 0.6%' },
      index: 'callNo',
      type: 'currency',
      format: item => `${item.callNo} 万`,
      sort: {
        compare: (a, b) => a.callNo - b.callNo
      },
      iif: () => this.isChoose('callNo')
    },
    {
      title: '状态',
      type: 'badge',
      index: 'status',
      badge: this.BADGE,
      // filter: {
      //   menus: this.status,
      //   fn: (filter, record) => record.status === filter.index
      // },
      iif: () => this.isChoose('status')
    },
    {
      title: '更新时间',
      index: 'updatedAt',
      type: 'date',
      filter: {
        type: 'keyword'
      },
      sort: {
        compare: (a, b) => a.updatedAt - b.updatedAt
      },
      iif: () => this.isChoose('updatedAt')
    },
    {
      title: '操作区',
      buttons: [
        // {
        //   text: 'Edit',
        //   icon: 'edit',
        //   type: 'modal',
        //   modal: {
        //     component: DemoModalComponent
        //   },
        //   click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`)
        // },
        // {
        //   text: 'Drawer',
        //   type: 'drawer',
        //   drawer: {
        //     title: '编辑',
        //     component: DemoDrawerComponent
        //   },
        //   click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`)
        // },
        {
          icon: 'check-circle',
          click: record => this.message.info(`check-${record.name}`),
          iif: record => record.id % 2 === 0,
          iifBehavior: 'disabled',
          tooltip: `Is disabled button`
        },
        {
          icon: 'delete',
          type: 'del',
          pop: {
            title: 'Yar you sure?',
            okType: 'danger',
            icon: 'star'
          },
          click: (record, _modal, comp) => {
            this.message.success(`成功删除【${record.name}】`);
            comp!.removeRow(record);
          },
          iif: record => record.id % 2 === 0
        },
        {
          text: '更多',
          children: [
            {
              text: record => (record.id === 1 ? `过期` : `正常`),
              click: record => this.message.error(`${record.id === 1 ? `过期` : `正常`}【${record.name}】`)
            },
            {
              text: `审核`,
              click: record => this.message.info(`check-${record.name}`),
              iif: record => record.id % 2 === 0,
              iifBehavior: 'disabled',
              tooltip: 'This is tooltip'
            },
            {
              type: 'divider'
            },
            {
              text: `重新开始`,
              icon: 'edit',
              click: record => this.message.success(`重新开始【${record.name}】`)
            }
          ]
        }
      ]
    }
  ];
  customColumns = [
    { label: '规则编号', value: 'no', checked: true, disableChecked: true },
    { label: '描述', value: 'description', checked: true, disableChecked: false },
    { label: '服务调用次数', value: 'callNo', checked: true, disableChecked: false },
    { label: '状态', value: 'status', checked: true, disableChecked: false },
    { label: '更新时间', value: 'updatedAt', checked: true, disableChecked: false }
  ];

  groupActions: any[] = [
    {
      name: 'group1',
      children: [
        {
          disabled: (data: any) => {
            return data.some((i: { key: number }) => i.key === 2);
          },
          icon: 'rowAction1',
          renderIcon: 'setting',
          onClick: (data: any) => {
            console.log(data);
          },
          text: 'rowAction1',
          tooltip: 'rowAction1'
        },
        {
          disabled: (data: any) => false,
          icon: 'rowAction2',
          renderIcon: 'vertical-align-bottom',
          onClick: (data: any) => {},
          text: 'rowAction2',
          tooltip: 'rowAction2'
        },
        {
          disabled: (data: any) => false,
          icon: 'rowAction3',
          renderIcon: 'plus',
          onClick: (data: any) => {},
          text: 'rowAction3',
          tooltip: 'rowAction3'
        },
        {
          disabled: (data: any) => {
            return data.some((i: { key: number }) => i.key === 2);
          },
          icon: 'rowAction4',
          renderIcon: 'plus',
          onClick: (data: any) => {
            console.log(data);
          },
          text: 'rowAction4',
          tooltip: 'rowAction4'
        }
      ]
    },
    {
      name: 'group2',
      children: [
        {
          disabled: (data: any) => {
            return data.some((i: { key: number }) => i.key === 2);
          },
          icon: 'rowAction1',
          renderIcon: 'setting',
          onClick: (data: any) => {
            console.log(data);
          },
          text: 'rowAction1',
          tooltip: 'rowAction1'
        },
        {
          disabled: (data: any) => {
            return data.some((i: { key: number }) => i.key === 2);
          },
          icon: 'rowAction1',
          renderIcon: 'setting',
          onClick: (data: any) => {
            console.log(data);
          },
          text: 'rowAction1',
          tooltip: 'rowAction1'
        },
        {
          disabled: (data: any) => {
            return data.some((i: { key: number }) => i.key === 2);
          },
          icon: 'rowAction1',
          renderIcon: 'setting',
          onClick: (data: any) => {
            console.log(data);
          },
          text: 'rowAction1',
          tooltip: 'rowAction1'
        },
        {
          disabled: (data: any) => false,
          icon: 'rowAction2',
          renderIcon: 'vertical-align-bottom',
          onClick: (data: any) => {},
          text: 'rowAction2',
          tooltip: 'rowAction2'
        },
        {
          disabled: (data: any) => false,
          icon: 'rowAction3',
          renderIcon: 'plus',
          onClick: (data: any) => {},
          text: 'rowAction3',
          tooltip: 'rowAction3'
        },
        {
          disabled: (data: any) => {
            return data.some((i: { key: number }) => i.key === 2);
          },
          icon: 'rowAction4',
          renderIcon: 'plus',
          onClick: (data: any) => {
            console.log(data);
          },
          text: 'rowAction4',
          tooltip: 'rowAction4'
        }
      ]
    }
  ];

  breadcrumbs = [
    {
      url: '/crud/list',
      label: '一级菜单',
      active: true,
      renderIcon: 'vertical-align-bottom'
    },
    {
      url: '/crud/list',
      label: '二级菜单'
    }
  ];

  rowActions = [
    {
      disabled: (data: any) => {
        return data.some((i: { key: number }) => i.key === 2);
      },
      icon: 'rowAction1',
      renderIcon: 'vertical-align-bottom',
      onClick: (data: any) => {
        console.log(data);
      },
      text: 'rowAction1',
      tooltip: 'rowAction1'
    }
  ];

  constructor(private http: _HttpClient, private message: NzMessageService, private cdr: ChangeDetectorRef, private arr: ArrayService) {}

  ngOnInit(): void {
    this.refresh();

    const MOCK_ARR: any[] = [
      { id: 1, pid: 0, name: 'name1', other: 'value1', halfChecked: true },
      { id: 2, pid: 0, name: 'name2', other: 'value2', disabled: true },
      { id: 3, pid: 1, name: 'name3', other: 'value3', expanded: true },
      { id: 4, pid: 1, name: 'name4', other: 'value4', selected: true },
      { id: 5, pid: 2, name: 'name5', other: 'value5' },
      { id: 6, pid: 0, name: 'name6', other: 'value6', checked: true }
    ];

    const options = {
      pidMapName: 'id',
      parentIdMapName: 'pid',
      cb: (item: any) => {}
    };

    console.log(this.arr.arrToTree(MOCK_ARR, options));
  }

  ngAfterViewInit(): void {
    console.log(this.myBox.nativeElement);
    this.myBox.nativeElement.style.width = '50px';
    this.myBox.nativeElement.style.height = '50px';
    this.myBox.nativeElement.style.background = 'red';
    console.log(this.myBox.nativeElement.innerHTML);
  }

  refresh(): void {
    this.loading = true;
    this.http
      .get('/rule', this.q)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data = res;
        this.cdr.detectChanges();
      });
  }

  stChange(e: STChange): void {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.refresh();
        break;
    }
  }

  isChoose(key: string): boolean {
    return !!this.customColumns.find(w => w.value === key && w.checked);
  }

  export(): void {
    const data = [this.columns.map(i => i.title)];
    this.data.map(i => {
      return data.push(
        this.columns.map(c => {
          if (c.index) {
            return i[c.index as string];
          }
        })
      );
    });
    // this.xlsx.export({
    //   sheets: [
    //     {
    //       data,
    //       name: 'sheet name'
    //     }
    //   ],
    //   filename: '11111.xlsx',
    //   opts: 'xlsx'
    // });

    // 表格默认配置导出方式
    this.st.export(true, {
      filename: 'via-data.xlsx',
      sheetname: 'user',
      callback: (wb: any) => {
        console.log(wb);
      }
    });
  }
}
