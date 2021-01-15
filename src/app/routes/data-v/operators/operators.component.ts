import { Component, OnInit } from '@angular/core';
import { concat, from, fromEvent, interval, of, throwError, timer } from 'rxjs';
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
    // 每1秒发出值
    const source = interval(1000);
    // 5秒后发出值
    const timer$ = timer(6000);
    // 当5秒后 timer 发出值时， source 则完成
    const example = source.pipe(takeUntil(timer$));
    // 输出: 0,1,2,3
    const subscribe = example.subscribe((val) => console.log(val));
  }
}
