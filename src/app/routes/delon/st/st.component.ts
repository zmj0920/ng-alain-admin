import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc/st';
import { G2MiniBarData } from '@delon/chart/mini-bar';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { switchMap } from 'rxjs/operators';
import { from, fromEvent, interval, of, throwError, timer } from 'rxjs';
@Component({
  selector: 'app-st',
  templateUrl: './st.component.html',
  styles:[
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
    `
  ]
})
export class STDemoComponent implements OnInit {
   demoValue = 1;
   minusState = false;
  constructor(public http: _HttpClient, private message: NzMessageService) { }
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
    this.http.get('/chart/visit').pipe(
      switchMap((res: G2MiniBarData[]) => this.events = res.slice(0, 8))
    ).subscribe();
  }

  fullChange(val: boolean): void {
    this.scroll = val ? { y: '350px' } : { y: '230px' };

    const names = ['Ben', 'Jafar', 'Matt', 'Priya', 'Brian'];
    
    of(names).subscribe(console.log);
    
   
  }

  // Array.prototype.map = function(callback) {
  //   var result = []; // map 最後一定會返回一個新陣列，所以我們先宣告一個新陣列
    
  //   this.forEach(function(element, index) {
  //     // this 就是呼叫 map 的陣列
  //     result.push(callback(element, index));
  //     // 執行使用者定義的 callback， callback 會回傳使用者預期的元素，所以我們把它 push 進新陣列
  //   })
    
  //   return result;
  // }


  // Array.prototype.filter = function(callback) {
  //   var result = [];
  //   this.forEach((item, index) => {
  //     if(callback(item, index))
  //       result.push(item);
  //   });
  //   return result;
  // }

  // newMap(callback: Function) {
  //   const result: any[] = [];
  //   this.forEach((item, index) => {
  //     if(callback(item, index))
  //       result.push(item);
  //   });
  //   return result;
  // }


}
