import { Component, OnInit } from '@angular/core';
import { combineLatest, concat, from, fromEvent, interval, of, race, Subject, throwError, timer } from 'rxjs';
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
  styles: []
})
export class OperatorsComponent implements OnInit {
  isLoadingOne = false;
  constructor() { }

  ngOnInit(): void {
    const a: Subject<number> = new Subject();
    const b: Subject<number> = new Subject();
    const c: Subject<number> = new Subject();

    const d = combineLatest([a, b, c])
      .pipe(
        map(data => {
          let [a, b, c] = data;
          return (a + b) * c;
        })
      );



    setTimeout(() => a.next(2), 1000)
    setTimeout(() => b.next(3), 1000)
    setTimeout(() => c.next(5), 1000)
    setTimeout(() => c.next(11), 1000)
    d.subscribe(res => console.log(res));


  }
}
