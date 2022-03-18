import { Component, ElementRef, OnInit } from '@angular/core';
import {
  audit,
  auditTime,
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  catchError,
  combineAll,
  combineLatestAll,
  combineLatestWith,
  concatAll,
  concatMap,
  concatMapTo,
  concatWith,
  connect,
  count,
  debounce,
  debounceTime,
  defaultIfEmpty,
  delay,
  delayWhen,
  dematerialize,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  elementAt,
  endWith,
  every,
  exhaust,
  exhaustAll,
  exhaustMap,
  expand,
  filter,
  finalize,
  find,
  findIndex,
  first,
  groupBy,
  ignoreElements,
  isEmpty,
  last,
  map,
  mapTo,
  materialize,
  max,
  mergeAll,
  flatMap,
  mergeMap,
  mergeMapTo,
  mergeScan,
  mergeWith,
  min,
  multicast,
  observeOn,
  onErrorResumeNext,
  pairwise,
  partition,
  pluck,
  publish,
  publishBehavior,
  publishLast,
  publishReplay,
  raceWith,
  reduce,
  repeat,
  repeatWhen,
  retry,
  retryWhen,
  refCount,
  sample,
  sampleTime,
  scan,
  sequenceEqual,
  share,
  shareReplay,
  single,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  startWith,
  subscribeOn,
  switchAll,
  switchMap,
  switchMapTo,
  switchScan,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  throttleTime,
  throwIfEmpty,
  timeInterval,
  timeout,
  timeoutWith,
  timestamp,
  toArray,
  window,
  windowCount,
  windowTime,
  windowToggle,
  windowWhen,
  withLatestFrom,
  zipAll,
  zipWith
} from 'rxjs/operators';

import {
  animationFrames,
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  AsyncSubject,
  BehaviorSubject,
  bindNodeCallback,
  combineLatest,
  concat,
  connectable,
  defer,
  firstValueFrom,
  forkJoin,
  from,
  fromEvent,
  fromEventPattern,
  generate,
  identity,
  iif,
  interval,
  isObservable,
  lastValueFrom,
  merge,
  noop,
  observable,
  of,
  queueScheduler,
  race,
  range,
  ReplaySubject,
  scheduled,
  Subject,
  Subscriber,
  Subscription,
  throwError,
  timer,
  using,
  zip
} from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styles: []
})
export class OperatorsComponent implements OnInit {
  isLoadingOne = false;
  constructor(private elm: ElementRef) {}

  // 如果我们需要在等待完成的同时按顺序做事情，那么 concatMap 是正确的选择
  // 如果我们需要取消逻辑，switchMap 是要走的路
  // 为了在当前的 Observables 仍在进行时忽略新的 Observables，exhaustMap 就是这样做的

  ngOnInit(): void {}

  withLatestFromTest() {
    // withLatestFrom 运行方式跟 combineLatest 有点像，只是他有主从的关系，只有在主要的 observable 送出新的值时，
    // 才会执行 callback，附随的 observable 只是在背景下运行
    // 每5秒发出值
    const source = interval(5000);
    // 每1秒发出值
    const secondSource = interval(1000);
    source
      .pipe(
        withLatestFrom(secondSource),
        map(([first, second]) => {
          return `First Source (5s): ${first} Second Source (1s): ${second}`;
        })
      )
      .subscribe(val => console.log(val));
    // 输出:
    // "First Source (5s): 0 Second Source (1s): 4"
    // "First Source (5s): 1 Second Source (1s): 9"
    // "First Source (5s): 2 Second Source (1s): 14"
  }

  startWithTest() {
    // 发出给定的第一个值
    // 发出 ('World!', 'Goodbye', 'World!')
    const source = of('World!', 'Goodbye', 'World!');
    // 以 'Hello' 开头，后面接当前字符串
    source
      .pipe(
        startWith('Hello'),
        scan((acc, curr) => `${acc} ${curr}`)
      )
      .subscribe(val => console.log(val));
    // 输出:
    // "Hello"
    // "Hello World!"
    // "Hello World! Goodbye"
    // "Hello World! Goodbye World!"
  }

  switchMapTest() {
    // 类似于 mergeMap，但是当源 Observable 发出值时会取消内部 Observable 先前的所有订阅 。
    // 立即发出值， 然后每5秒发出值
    timer(0, 5000)
      .pipe(switchMap(() => interval(1000)))
      .subscribe(val => console.log(val));
    // 当 source 发出值时切换到新的内部 observable，发出新的内部 observable 所发出的值
    // 输出:0,1,2,3,4  0,1,2,3,4
  }

  pairwiseTest() {
    // 当 Observable 发出值时让我知道，但还得给我前一个值。(以数组的形式) [0,1] [1,2] [2,3]
    interval(1000).pipe(pairwise(), take(5)).subscribe(console.log);
  }

  mergeMapTest() {
    // 对于并行处理，mergeMap 是最好的选择
    // 仅当内部 Obervable 发出值时，通过合并值到外部 Observable 来让我知道。
    const post$ = of({ id: 1 });
    const getPostInfo$ = timer(3000).pipe(mapTo({ title: 'Post title' }));
    post$.pipe(mergeMap(post => getPostInfo$)).subscribe(res => console.log(res));
  }

  combineLatestTest() {
    // 当任意 Observable 发出值时让我知道，但还要给我其他 Observalbes 的最新值。(以数组的形式)
    const intervalOne$ = interval(2000);
    const intervalTwo$ = interval(1000);
    combineLatest([intervalOne$, intervalTwo$]).subscribe(all => console.log(all));
  }

  forkJoinTest() {
    // 直到所有的 Observables 都完成了才通知我，然后一次性地给我所有的值。(以数组的形式)
    // 当你需要并行地运行 Observables 时使用此操作符。
    const getPostOne$ = timer(3000).pipe(mapTo({ id: 1 }));
    const getPostTwo$ = timer(1000).pipe(mapTo({ id: 2 }));
    forkJoin([getPostOne$, getPostTwo$]).subscribe(res => console.log(res));
  }

  mergeTest() {
    // 与concat类似，merger操作符也可将两个或多个数据流合并到一个数据流中，但不再是以首尾相连的形式，
    // 而是在第一时间订阅所有传入的Observable的值，
    // 任意一个Observable对象中的值发生变化，则立即传给下游的Observable对象。

    // 每2.5秒发出值
    const first = interval(2500);
    // 每2秒发出值
    const second = interval(2000);
    // 每1.5秒发出值
    const third = interval(1500);
    // 每1秒发出值
    const fourth = interval(1000);

    // 从一个 observable 中发出输出值
    const example = merge(
      first.pipe(mapTo('FIRST!')),
      second.pipe(mapTo('SECOND!')),
      third.pipe(mapTo('THIRD')),
      fourth.pipe(mapTo('FOURTH'))
    ).subscribe(val => console.log(val));
    // 输出: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
  }

  concatTest() {
    // 模拟 HTTP 请求
    // 按顺序订阅 Observables，但是只有当一个完成并让我知道，然后才会开始下一个。
    // 当顺序很重要时，使用此操作符，例如当你需要按顺序的发送 HTTP 请求时。
    const getPostOne$ = timer(3000).pipe(mapTo({ id: 1 }));
    const getPostTwo$ = timer(1000).pipe(mapTo({ id: 2 }));
    concat(getPostOne$, getPostTwo$).subscribe(res => console.log(res));
  }

  zipTest() {
    // zip与concat、merge有一个明显的不同，它会将上游Observable的数据构建成数组的形式，传递到下游；数组中数据元素的所以分别对应传入的Observable的顺序。
    const sourceOne = of('Hello');
    const sourceTwo = of('World!');
    const sourceThree = of('Goodbye');
    const sourceFour = of('World!');
    // 一直等到所有 observables 都发出一个值，才将所有值作为数组发出
    zip(sourceOne, sourceTwo.pipe(delay(1000)), sourceThree.pipe(delay(2000)), sourceFour.pipe(delay(3000))).subscribe(val =>
      console.log(val)
    );
    // 输出: ["Hello", "World!", "Goodbye", "World!"]
  }
}
