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


  ngOnInit(): void {
  
  }





  

}
