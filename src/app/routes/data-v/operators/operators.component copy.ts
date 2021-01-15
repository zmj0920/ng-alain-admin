import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, of, throwError, timer } from 'rxjs';
import {
  audit,
  buffer,
  bufferCount,
  bufferTime,
  catchError,
  combineAll,
  concatAll,
  debounce,
  debounceTime,
  defaultIfEmpty,
  delay,
  delayWhen,
  every,
  map,
  mapTo,
  mergeAll,
  retryWhen,
  scan,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
  zipAll,
} from 'rxjs/operators';
@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styles: [],
})
export class OperatorsComponent implements OnInit {
  isLoadingOne = false;
  constructor() {}

  ngOnInit(): void {
    // buffer 每次点击时，发出最近间隔事件的数组
    const clicks = fromEvent(document, 'click');
    // interval(3000)
    //   .pipe(buffer(clicks))
    //   .subscribe((x) => console.log(x));

    // audit 以每秒最多一次点击的速度发出点击
    // clicks.pipe(audit((ev) => interval(1000))).subscribe((x) => console.log(x));
    // 将最后两个click事件作为数组发送
    // clicks.pipe(bufferCount(2)).subscribe((x) => console.log(x));

    // clicks.pipe(bufferTime(1000)).subscribe((x) => console.log(x));
    // 点击后发出最近的点击
    // clicks.pipe(debounce(() => interval(1000))).subscribe((x) => console.log(x));

    clicks.pipe(debounceTime(1000)).subscribe((x) => console.log(x));

    this.ofTest();
  }

  loadOne(): void {
    this.isLoadingOne = true;

    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5000);
  }

  ofTest() {
    // from of 创建一个Observable，它会一次发出提供的参数，最后发出完成通知。
    // of('hello', 'world').subscribe({
    //   next: (v) => {
    //     console.log(v);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('完成');
    //   },
    // });
    // from([of(1, 2, 3), of('a', 'b', 'c')])
    //   .pipe(concatAll())
    //   .subscribe({
    //     next: (v) => {
    //       console.log(v);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //     complete: () => {
    //       console.log('完成');
    //     },
    //   });
    // catchError 发生错误时继续使用其他 Observable
    // of(1, 2, 3, 4, 5)
    //   .pipe(
    //     map((n) => {
    //       if (n === 4) {
    //         throw 'four!';
    //       }
    //       return n;
    //     }),
    //     catchError((err) => of('I', 'II', 'III', 'IV', 'V')),
    //   )
    //   .subscribe((x) => console.log(x));
    // startWith  在开头添加要发送的元素
    // of(1, 2, 3)
    // .pipe(startWith(3, 4, 5))
    // .subscribe((val) => console.log(val));
    // 发出 ('World!', 'Goodbye', 'World!')
    // 以 'Hello' 开头，后面接当前字符串
    // of('World!', 'Goodbye', 'World!')
    //   .pipe(
    //     startWith('Hello'),
    //     scan((acc, curr) => `${acc} ${curr}`),
    //   )
    //   .subscribe((val) => console.log(val));
    // 结合源 Observablecombines（实例）和其他输入 Observables 的最新值，
    // 当且仅当 source 发出数据时, 可选的使用 project 函数以决定输出 Observable 将要发出的值。
    // 在输出 Observable 发出值之前，所有的输入 Observables 都必须发出至少一个值。
    // 每5秒发出值
    // interval(1000)
    //   .pipe(
    //     withLatestFrom(interval(5000)), // 每1秒发出值
    //     map(([first, second]) => {
    //       return `First Source (5s): ${first} Second Source (1s): ${second}`;
    //     }),
    //   )
    //   .subscribe((val) => console.log(val));
    // 每1秒发出值
    // const source = interval(1000);
    // // 当一个 observable 完成时，便不会再发出更多的值了
    // const example = zipAll(source, source.pipe(take(2)));
    // // 输出: [0,0]...[1,1]
    // const subscribe = example.subscribe(val => console.log(val));
    // 当源 observable 为空时，发出 'Observable.of() Empty!'，否则发出源的任意值
    // of()
    //   .pipe(defaultIfEmpty('Observable.of() Empty!'))
    //   .subscribe((val) => console.log(val));
    // 输出: 'Observable.of() Empty!'
    // every 发出5个值 每项都满足指定的条件返回true否则返回false
    // of(1, 2, 3, 4, 5)
    //   .pipe(
    //     // 每个值都是偶数吗？
    //     every((val) => val % 2 === 0),
    //   )
    //   .subscribe((val) => console.log(val));
    // 输出: false
    // 在订阅上使用指定值来发出错误
    // 输出: 'Error: This is an error!'
    // throwError('This is an error!').subscribe({
    //   next: (val) => console.log(val),
    //   complete: () => console.log('Complete!'),
    //   error: (val) => console.log(`Error: ${val}`),
    // });
    // RxJS v6+
    /*
  timer 接收第二个参数，它决定了发出序列值的频率，在本例中我们在1秒发出第一个值，
  然后每2秒发出序列值
*/
    // 输出: 0,1,2,3,4,5......
    // const subscribe = timer(1000, 2000).subscribe((val) => console.log(val));
    // retry失败前重试的次数
    //  this.http
    //  .get('/api/notice')
    //  .pipe(retry(3))
    //  .subscribe((res: any) => {
    //    console.log(res);
    //    return res;
    //  });
    // 每1秒发出值
    // interval(1000)
    //   .pipe(
    //     map((val) => {
    //       if (val > 5) {
    //         // 错误将由 retryWhen 接收
    //         throw val;
    //       }
    //       return val;
    //     }),
    //     retryWhen((errors) =>
    //       errors.pipe(
    //         // 输出错误信息
    //         tap((val) => console.log(`Value ${val} was too high!`)),
    //         // 5秒后重启
    //         delayWhen((val) => timer(val * 1000)),
    //       ),
    //     ),
    //   )
    //   .subscribe((val) => console.log(val));
    /*
  输出:
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --等待5秒后然后重复此过程
*/
  }
}
