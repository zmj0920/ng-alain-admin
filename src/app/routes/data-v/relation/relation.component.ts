import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { BookService } from '@services/book/book.service';

@Component({
  selector: 'app-data-v-relation',
  templateUrl: './relation.component.html',
})
export class RelationComponent implements OnInit {
  public alertMsg: string;

  public title: string = '我是父组件标题';

  birthday = new Date('Fri Nov 27 2020 10:46:58 GMT+0800');
  myInput = 0;
  constructor(private http: _HttpClient, private bookService: BookService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // 消息提示 从service获取消息内容
    this.bookService.getMessage().subscribe((value) => {
      this.alertMsg = value;
    });

    let observableAsny = this.bookService.observableAsny();

    // 订阅
    observableAsny.subscribe((data) => {
      console.log(data);
    });


  }


  // tslint:disable-next-line: typedef
  sendMessage() {
    this.bookService.sendMessage('显示成功');
  }
  // tslint:disable-next-line: typedef
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

  // 接收子组件传递过来的数据
  runParent(msg: string) {
    alert(msg);
  }

}
