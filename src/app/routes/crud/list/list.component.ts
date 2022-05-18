import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STColumnBadge, STComponent, STData } from '@delon/abc/st';
import { XlsxService } from '@delon/abc/xlsx';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { tap } from 'rxjs/operators';
import { dateTimePickerUtil } from '@delon/util';

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
      renderIcon: 'reload',
      onClick: (data: any) => {
        this.refresh();
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
      renderIcon: 'setting',
      onClick: (data: any) => {
        console.log(data);
        // this.tabSelectedIndex = 0;
      },
      text: 'rowAction1',
      tooltip: 'rowAction1'
    },
    {
      disabled: (data: any) => false,
      renderIcon: 'vertical-align-bottom',
      onClick: (data: any) => {
        console.log(data);
        // this.tabSelectedIndex = 1;
      },
      text: 'rowAction2',
      tooltip: 'rowAction2'
    },
    {
      disabled: (data: any) => false,
      renderIcon: 'plus',
      onClick: (data: any) => {
        // this.tabSelectedIndex = 2;
      },
      text: 'rowAction3',
      tooltip: 'rowAction3'
    },
    {
      disabled: (data: any) => {
        return data.some((i: { key: number }) => i.key === 2);
      },
      renderIcon: 'plus',
      onClick: (data: any) => {
        console.log(data);
      },
      text: 'rowAction41111111111111111111111111111111111111111111111111111',
      tooltip: 'rowAction4'
    },
    {
      disabled: (data: any) => {
        return data.some((i: { key: number }) => i.key === 2);
      },
      renderIcon: 'setting',
      onClick: (data: any) => {
        console.log(data);
      },
      text: 'rowAction5',
      tooltip: 'rowAction5'
    },
    {
      disabled: (data: any) => {
        return data.some((i: { key: number }) => i.key === 2);
      },
      renderIcon: 'vertical-align-bottom',
      onClick: (data: any) => {
        console.log(data);
      },
      text: 'rowAction6',
      tooltip: 'rowAction6'
    }
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
      title: '自定义',
      renderTitle: 'customTitle',
      render: 'custom'
    },
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
      filter: {
        menus: [
          { text: '关闭', value: 0 },
          { text: '成功', value: 1 },
          { text: '错误', value: 2 },
          { text: '进行中', value: 3 },
          { text: '默认', value: 4 },
          { text: '警告', value: 5 }
        ],
        fn: (filter, record) => record.status === filter.value,
        multiple: true
      },
      iif: () => this.isChoose('status')
    },
    {
      title: '更新时间',
      index: 'updatedAt',
      type: 'date',
      filter: {
        type: 'date',
        date: {
          mode: 'date',
          showToday: false,
          disabledDate: dateTimePickerUtil.disabledAfterDate()
        }
        // fn: (filter, record) => record.updatedAt === filter.value
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
      name: 'group111111111111111111111111111111111111',
      children: [
        {
          disabled: (data: any) => {
            return true;
          },
          renderIcon: 'setting',
          onClick: (data: any) => {
            console.log(data);
          },
          text: 'rowAction1111111111111111111111111111111111111111111111',
          tooltip: 'rowAction1'
        },
        {
          disabled: (data: any) => false,
          renderIcon: 'vertical-align-bottom',
          onClick: (data: any) => {},
          text: 'rowAction2',
          tooltip: 'rowAction2'
        },
        {
          disabled: (data: any) => false,
          renderIcon: 'plus',
          onClick: (data: any) => {},
          text: 'rowAction3',
          tooltip: 'rowAction3'
        },
        {
          disabled: (data: any) => {
            return data.some((i: { key: number }) => i.key === 2);
          },
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
          renderIcon: 'setting',
          onClick: (data: any) => {
            console.log(data);
          },
          text: 'rowAction1',
          tooltip: 'rowAction1'
        },
        {
          disabled: (data: any) => false,
          renderIcon: 'vertical-align-bottom',
          onClick: (data: any) => {},
          text: 'rowAction2',
          tooltip: 'rowAction2'
        },
        {
          disabled: (data: any) => false,
          renderIcon: 'plus',
          onClick: (data: any) => {},
          text: 'rowAction3',
          tooltip: 'rowAction3'
        },
        {
          disabled: (data: any) => {
            return data.some((i: { key: number }) => i.key === 2);
          },
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
      url: '/pro/list/table-list',
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
      renderIcon: 'vertical-align-bottom',
      onClick: (data: any) => {},
      text: 'rowAction1',
      tooltip: 'rowAction1'
    }
  ];

  exportOptions = {
    show: true,
    exportXlsx: () => {
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
  };

  tabs: any[] = [
    {
      key: '1',
      name: 'Tab1'
    },
    {
      key: '2',
      name: 'Tab2'
    },
    {
      key: '3',
      name: 'Tab3',
      disabled: () => {
        return true;
      }
    }
  ];

  tabSelectedIndex = 0;

  constructor(private http: _HttpClient, private message: NzMessageService, private cdr: ChangeDetectorRef, private xlsx: XlsxService) {}

  ngOnInit(): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    // console.log(this.myBox.nativeElement);
    // this.myBox.nativeElement.style.width = '50px';
    // this.myBox.nativeElement.style.height = '50px';
    // this.myBox.nativeElement.style.background = 'red';
    // console.log(this.myBox.nativeElement.innerHTML);
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

  tabClick(tab: any) {
    console.log(tab);
  }
}
