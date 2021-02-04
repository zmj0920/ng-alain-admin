import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { BookService } from '@services/book/book.service';
@Component({
  selector: 'app-data-v-relation',
  styleUrls: ['./relation.component.scss'],
  templateUrl: './relation.component.html',
})
export class RelationComponent implements OnInit {
  public alertMsg!: string;
  demoValue = 1;
  public title = '我是父组件标题';
  constructor(private bookService: BookService, private clipboard: Clipboard) {}
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

  // 接收子组件传递过来的数据
  runParent(msg: string): void {
    alert(msg);
  }

  /** 点击复制 */
  copy(): void {
    const pending = this.clipboard.copy('复制这段文本1');
    //  pending.destroy();
  }
}
