import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { BookService } from '@services/book/book.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public alertMsg: string;
  birthday = new Date('Fri Nov 27 2020 10:46:58 GMT+0800');
  myInput = 0;
  constructor(private http: _HttpClient, private bookService: BookService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
     // 消息提示 从service获取消息内容
     this.bookService.getMessage().subscribe(value => {
      this.alertMsg = value;
    });
  }

  // tslint:disable-next-line: typedef
  sendMessage() {
    this.bookService.sendMessage('显示成功');
  }

}
