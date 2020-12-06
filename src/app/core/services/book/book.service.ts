import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  private msg = new Subject<string>();

  // 发送消息
  sendMessage(message: string): void {
    this.msg.next(message);
  }
  // 清除消息
  clearMessage(): void {
    this.msg.next();
  }
  // 获取消息
  getMessage(): Observable<string> {
    return this.msg.asObservable();
  }

  observableAsny() {
    //异步处理
    return new Observable((observer) => {
      setTimeout(() => {
        let userName = '张三'
        observer.next(userName)
        observer.error("失败")
      }, 1000);
    })
  }


}
