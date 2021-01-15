import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { BookService } from '@services/book/book.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data-v-relation',
  styleUrls: ['./relation.component.less'],
  templateUrl: './relation.component.html',
})
export class RelationComponent implements OnInit {
  public alertMsg!: string;

  public title = '我是父组件标题';
  colorClassName = 'color';

  birthday = new Date('Fri Nov 27 2020 10:46:58 GMT+0800');
  myInput = 0;
  demo6Result = '';
  constructor(private http: _HttpClient, private bookService: BookService) {}

  ngOnInit(): void {
    // 消息提示 从service获取消息内容
    this.bookService.getMessage().subscribe((value) => {
      this.alertMsg = value;
    });

    const observableAsny = this.bookService.observableAsny();

    // 订阅
    observableAsny.subscribe((data) => {
      // console.log(data);
    });
    this.bookService.subscribeSub();
  }

  sendMessage(): void {
    this.bookService.sendMessage('显示成功');
  }

  onSubmit(f: NgForm): void {
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
  }

  // 接收子组件传递过来的数据
  runParent(msg: string): void {
    alert(msg);
  }
}
