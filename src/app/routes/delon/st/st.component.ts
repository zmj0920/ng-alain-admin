import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { G2MiniBarData } from '@delon/chart/mini-bar';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { switchMap } from 'rxjs/operators';
import { from, fromEvent, interval, of, throwError, timer } from 'rxjs';
import { OnboardingService } from '@delon/abc/onboarding';
@Component({
  selector: 'app-st',
  templateUrl: './st.component.html',
  styles: [
    `
      :host ::ng-deep .ant-input-group.ant-input-group-compact > *:not(:last-child) {
        margin-right: 0px !important;
      }
      :host ::ng-deep .ant-input-number-handler-wrap {
        display: none;
      }
      :host ::ng-deep .ant-input-number-input {
        text-align: center;
      }
    `,
  ],
})
export class STDemoComponent implements OnInit {
  demoValue = 1;
  minusState = false;
  constructor(public http: _HttpClient, private message: NzMessageService, private srv: OnboardingService) {}
  data: any = 'dataVar';
  ps = 20;
  total = 200; // mock total
  args = { _allow_anonymous: true, userid: null };
  url = `https://api.randomuser.me/?results=20`;
  events: G2MiniBarData[] = [];
  scroll = { y: '230px' };
  columns: STColumn[] = [
    { title: 'id', index: 'id.value', type: 'checkbox' },
    { title: 'Avatar', index: 'picture.thumbnail', type: 'img', width: 80 },
    {
      title: 'Name',
      index: 'name.first',
      width: 150,
      format: (item) => `${item.name.first} ${item.name.last}`,
      type: 'link',
      click: (item) => this.message.info(`${item.name.first}`),
    },
    { title: 'Email', index: 'email' },
    {
      title: 'Gender',
      index: 'gender',
      type: 'yn',
      yn: {
        truth: 'female',
        yes: '男',
        no: '女',
        mode: 'text',
      },
      width: 120,
    },
    { title: 'Events', render: 'events', width: 90 },
    { title: 'Registered', index: 'registered.date', type: 'date', width: 170 },
    {
      title: 'Actions',
      width: 120,
      buttons: [
        {
          text: 'Edit',
          click: (item) => this.message.info(`edit [${item.id.value}]`),
          iif: (item) => item.gender === 'female',
        },
        {
          text: 'Delete',
          type: 'del',
          click: (item) => this.message.info(`deleted [${item.id.value}]`),
        },
      ],
    },
  ];

  counter = 0;

  @HostBinding('attr.role') role = 'nav';

  @HostBinding('class.pressed') isPressed = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    this.isPressed = false;
    this.counter++;
  }

  // @HostListener('mouseenter') onMouseEnter(): void {
  //   this.isPressed = false;
  // }

  // @HostListener('mouseleave') onMouseLeave(): void {
  //   this.isPressed = true;
  // }

  resetCounter(): void {
    this.counter = 0;
  }

  ngOnInit(): void {
    this.http
      .get('/chart/visit')
      .pipe(switchMap((res: G2MiniBarData[]) => (this.events = res.slice(0, 8))))
      .subscribe();
  }

  fullChange(val: boolean): void {
    this.scroll = val ? { y: '350px' } : { y: '230px' };

    const names = ['Ben', 'Jafar', 'Matt', 'Priya', 'Brian'];

    of(names).subscribe(console.log);
  }

  start(): void {
    this.srv.start({
      items: [
        {
          selectors: '.test1-1',
          content: 'The user guidance is to help users better understand and use the product',
          width: 300,
          next: `Go to home`,
          url: '/crud/list',
        },
        {
          selectors: '.test1-2',
          title: 'Test2',
          content: 'The user guidance is to help users better understand and use the product',
          next: `Go to home`,
          url: '/',
          before: 200,
        },
        {
          selectors: '.test1-3',
          title: 'Test3',
          content: 'The user guidance is to help users better understand and use the product',
          next: `Go to home`,
          url: '/crud/list',
        },
      ],
    });
  }

  viaHttp(): void {
    this.http.get(`./assets/tmp/on-boarding.json`).subscribe((res) => {
      console.log(res);
      this.srv.start(res);
    });
  }
}
