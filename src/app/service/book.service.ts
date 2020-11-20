import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  private msg = new Subject<string>();
  // 发送消息
  sendMessage(message: string) {
    this.msg.next(message);
  }
  // 清除消息
  clearMessage() {
    this.msg.next();
  }
  // 获取消息
  getMessage(): Observable<string> {
    return this.msg.asObservable();
  }
}
