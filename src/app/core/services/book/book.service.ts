import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  ConnectableObservable,
  from,
  interval,
  Observable,
  Observer,
  of,
  ReplaySubject,
  Subject,
  throwError,
  zip
} from 'rxjs';
import { mapTo, mergeMap, multicast, retry, take, tap } from 'rxjs/operators';

export interface Hero {
  id: number;
  name: string;
  tid: string; // tax id
}
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(public http: HttpClient) {}

  private msg1 = new Subject<string>();

  //  多播给多个观察者,允许将值多播给多个观察者，
  //  所以 Subject 是多播的，而普通的 Observables
  //  是单播的(每个已订阅的观察者都拥有 Observable 的独立执行)。

  public subject: Subject<any> = new Subject<any>();

  behaviorSubject = new BehaviorSubject(0);

  // 发送消息
  sendMessage(message: string): void {
    this.msg1.next(message);
  }
  // 清除消息
  clearMessage(): void {
    this.msg1.next('');
  }
  // 获取消息
  getMessage(): Observable<string> {
    return this.msg1.asObservable();
  }

  observableAsny(): Observable<any> {
    // 异步处理
    return new Observable(observer => {
      setTimeout(() => {
        const userName = '姓名';
        observer.next(userName);
        // observer.error('失败');
        observer.complete();
      }, 1000);
    });
  }

  subscribeSub(): void {
    // this.behaviorSub();
    // this.subjectTest();
    // this.replaySubjectTest();
    // this.asyncSubject();
    // let output = this.operatorsTest(from([1, 2, 3]));
    // output.subscribe((x) => console.log(x));
    // this.multicast();
    // this.multicastReplaySubject();
    this.retryTest();
  }

  subjectTest(): void {
    this.subject.subscribe({
      next: v => console.log(`ObsA${v}`)
    });
    this.subject.subscribe({
      next: v => console.log(`ObsB${v}`)
    });

    this.subject.next(1);
    this.subject.next(2);
    this.subject.next(3);

    from([1, 2, 3]).subscribe(this.subject);

    const subscription = interval(400).subscribe(x => console.log(`first: ${x}`));
    const childSubscription = interval(300).subscribe(x => console.log(`second: ${x}`));

    subscription.add(childSubscription);

    setTimeout(() => {
      // subscription 和 childSubscription 都会取消订阅
      subscription.unsubscribe();
    }, 1000);
  }

  behaviorSub(): void {
    /**
     * BehaviorSubject 使用值0进行初始化，当第一个观察者订阅时会得到0。
     * 第二个观察者订阅时会得到值2,每次接受者只会接受最新最送的那个消息：。
     */
    this.behaviorSubject.subscribe({
      next: v => console.log(`BehA${v}`)
    });

    this.behaviorSubject.next(1);

    this.behaviorSubject.subscribe({
      next: v => console.log(`BehB${v}`)
    });

    this.behaviorSubject.next(2);
  }

  replaySubjectTest(): void {
    // 当创建 ReplaySubject 时，你可以指定回放多少个值：
    const replaySubject = new ReplaySubject(3); // 为新的订阅者缓冲3个值

    replaySubject.subscribe({
      next: v => console.log(`observerA: ${v}`)
    });

    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);
    replaySubject.next(4);
    console.log('新的订阅者');
    replaySubject.subscribe({
      next: v => console.log(`observerB: ${v}`)
    });

    replaySubject.next(5);
  }

  asyncSubject(): void {
    /**
     * AsyncSubject同样是一种Subject，
     * 它总是在subject调用complete()后，
     * 才将之前最后一个值发送出去给它的订阅者
     * （比如订阅它的observer）。
     */
    const asyncSubject = new AsyncSubject();

    asyncSubject.subscribe({
      next: v => console.log(`observerA: ${v}`)
    });

    asyncSubject.next(1);
    asyncSubject.next(2);
    asyncSubject.next(3);
    asyncSubject.next(4);

    asyncSubject.subscribe({
      next: v => console.log(`observerB: ${v}`)
    });

    asyncSubject.next(5);
    asyncSubject.complete();
  }

  operatorsTest(input: any): Observable<any> {
    return new Observable(observer => {
      input.subscribe({
        next: (v: any) => observer.next(10 * v),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete()
      });
    });
  }

  multicast(): void {
    // 使用 subject 订阅 multi 需要调用 connect() 方法
    // 将Observable转换为一个multicast（组播）
    const multi = from([1, 2, 3]).pipe(multicast(this.subject)) as ConnectableObservable<number>;
    multi.subscribe({
      next: v => console.log(`A:${v}`)
    });
    multi.subscribe({
      next: v => console.log(`B:${v}`)
    });
    // 使用 subject 订阅 source
    multi.connect();
  }

  multicastReplaySubject(): void {
    // 每2秒发出值并只取前5个
    const source = interval(2000).pipe(take(5));

    // 使用 ReplaySubject 的示例
    const example = source.pipe(
      // 因为我们在下面进行了多播，所以副作用只会调用一次
      tap(_ => console.log('Side Effect #2')),
      mapTo('Result Two!')
    );
    // 可以使用任何类型的 subject
    const multi = example.pipe(multicast(() => new ReplaySubject(5))) as ConnectableObservable<number>;
    // 使用 subject 订阅 source
    multi.connect();

    setTimeout(() => {
      /*
      因为使用的是 ReplaySubject，订阅者会接收到 subscription 中的之前所有值。
      */
      // const subscriber = multi.subscribe((val) => console.group(val));
    }, 5000);
  }

  retryTest(): void {
    // this.http
    //   .get('https://api.randomuser.me/?results=20&pi=1&ps=20&userid=1')
    //   .pipe(retry(3))
    //   .subscribe((res: any) => {
    //     console.log(res);
    //   });
    // 失败前重试的次数
    this.http
      .get('/api/notice')
      .pipe(retry(3))
      .subscribe((res: any) => {});
  }

  getName() {
    return 'Angular';
  }

  heroes: Hero[] = [
    { id: 1, name: 'RubberMan', tid: '082-27-5678' },
    { id: 2, name: 'Tornado', tid: '099-42-4321' }
  ];

  getHeroes(): Observable<Hero[]> {
    return new Observable<Hero[]>((observer: Observer<Hero[]>) => {
      observer.next(this.heroes);
      observer.complete();
    });
  }
}
