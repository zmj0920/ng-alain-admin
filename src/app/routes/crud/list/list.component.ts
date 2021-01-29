import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { I18NService } from '@core';
import { STChange, STColumn, STData, STPage } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of, zip } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { SFComponent, SFSchema } from '@delon/form';
import { CrudConfigurationItemModalComponent } from '../configuration-item-modal/configuration-item-modal.component';
type ModelType = 'configure' | 'restore';

@Component({
  selector: 'app-table-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CrudListComponent implements OnInit {
  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private i18n: I18NService,
    private notification: NzNotificationService,
  ) {}
  @ViewChild('sf', { static: true }) sf!: SFComponent;
  description = '';
  screenfullStatus = false;
  dataSet = [
    {
      id: 'api_root_domain_name',
      configName: 'API根域名',
      description: '允许云管理员自定义云环境的API根域名。',
      currentConfig: '',
      defaultConfig: '',
    },
    {
      id: 'api_root_external_access_address',
      configName: '外部访问地址',
      description: '配置可以访问到云平台的IP地址或域名',
      currentConfig: '',
      defaultConfig: '',
    },
  ];
  page: STPage = {
    front: false,
    show: false,
  };
  loading = false;
  args = { _allow_anonymous: true, userid: null };
  scroll = { y: '230px' };

  columns: STColumn[] = [
    {
      title: '配置项',
      index: 'configName',
    },
    {
      title: '描述',
      index: 'description',
      type: 'widget',
      widget: { type: 'tooltip', params: ({ record }) => ({ tooltipText: record.description }) },
    },
    {
      title: '当前配置',
      index: 'currentConfig',
    },
    {
      title: '默认配置',
      index: 'defaultConfig',
    },
    {
      title: '操作',
      buttons: [
        {
          icon: 'setting',
          text: '配置',
          click: (item) => {
            item.id === 'api_root_domain_name'
              ? this.add(item, 'configure', 'global_config.operations.api_root_domain_name')
              : this.add(item, 'configure', 'global_config.operations.api_root_external_access_address');
          },
        },
        {
          icon: `edit`,
          text: '恢复默认',
          click: (item) => this.add(item, 'restore', 'global_config.common.restore_default'),
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    zip(this.getRootServerApiAddress(), this.getExternalAccessAddress())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this.cdr.detectChanges());
  }

  getRootServerApiAddress(): Observable<any> {
    return this.http.get('/api/domain/current').pipe(
      tap((res) => {
        const item: any = this.dataSet.find((_item) => _item.id === 'api_root_domain_name');
        item.currentConfig = res.address.current;
        item.defaultConfig = res.address.default;
        this.dataSet = [...this.dataSet];
      }),
    );
  }

  getExternalAccessAddress(): Observable<any> {
    return this.http.get('/api/config/public_address').pipe(
      tap((res) => {
        const item: any = this.dataSet.find((_item) => _item.id === 'api_root_external_access_address');
        item.currentConfig = res.address.current;
        item.defaultConfig = res.address.default;
        this.dataSet = [...this.dataSet];
      }),
    );
  }

  stChange(e: STChange): void {
    switch (e.type) {
      case 'checkbox':
        break;
      case 'filter':
        break;
    }
  }

  getConfigurationItemData(item: STData, address: string): void {
    switch (item.id) {
      case 'api_root_domain_name':
        this.setRootServerApiAddress(address);
        break;
      case 'api_root_external_access_address':
        this.setExternalAccessAddress(address);
        break;
      default:
        break;
    }
  }

  setRootServerApiAddress(address: string): void {
    this.http
      .post('/api/domain/current', { newaddress: address })
      .pipe(
        tap(() => {
          this.notification.success(``, `API根域名更新成功。`);
          this.getRootServerApiAddress().subscribe(() => this.cdr.detectChanges());
        }),
        catchError(() => {
          this.notification.success(``, `API根域名更新失败`);
          return of(false);
        }),
      )
      .subscribe();
  }

  setExternalAccessAddress(address: string): void {
    this.http
      .post('/api/config/public_address', { newaddress: address })
      .pipe(
        tap(() => {
          this.notification.success(``, `外部访问地址更新成功`);
          this.getExternalAccessAddress().subscribe(() => this.cdr.detectChanges());
        }),
        catchError(() => {
          this.notification.success(``, `外部访问地址更新失败`);
          return of(false);
        }),
      )
      .subscribe();
  }

  add(item: STData, mode: ModelType, modalTitle: string): void {
    this.modalSrv.create({
      nzTitle: this.i18n.fanyi(modalTitle),
      nzContent: CrudConfigurationItemModalComponent,
      nzComponentParams: {
        modalState: item,
        mode,
      },
      nzMaskClosable: false,
      nzOnOk: (m) => {
        return m
          .setConfigurationItem()
          .pipe(
            tap((observer) => {
              this.getConfigurationItemData(item, observer);
            }),
            catchError(() => of(false)),
          )
          .toPromise();
      },
    });
  }

  fullChange(val: boolean): void {
    this.screenfullStatus = true;
    this.scroll = val ? { y: '350px' } : { y: '230px' };
  }

  showModal(tpl: TemplateRef<{}>): void {
    this.modalSrv.create({
      nzTitle: '新建规则',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.http.post('/rule', { description: this.description }).subscribe(() => this.getData());
      },
    });
  }

  searchClick(e: any): void {
    this.getData();
  }
}
