import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
import { exhaustMap, filter, fromEvent, map, Observable, pairwise, startWith } from 'rxjs';

// map : 与数组的 map 类似，映射传入的数据流。
// filter : 与数组的 filter 类似，过滤传入的数据流。
// pairwise : 返回由当前发出值和前一个发出值组成的数组。
// startWith : 返回的 observable 会在发出源 observable 的值之前先发出提供的值。
// exhaustMap : 只有当内部 observable 完成后，才会发出新的值。

interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
}

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

@Directive({
  selector: '[infiniteScroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {
  private scrollEvent$!: Observable<any>;

  private userScrolledDown$!: Observable<any>;

  private requestOnScroll$!: Observable<any>;

  // 返回 observable 的回调函数。
  @Input()
  scrollCallback!: () => Observable<any>;

  // 如果为 true 则指令初始化后会立即调用 scrollCallback 。
  @Input()
  immediateCallback = false;

  // 用户需要滚动到容器的百分比，达到后方可调用 scrollCallback 。
  @Input()
  scrollPercent = 70;

  constructor(private elm: ElementRef) {}

  ngAfterViewInit() {
    this.registerScrollEvent();

    this.streamScrollEvents();

    this.requestCallbackOnScroll();
  }

  // 监听元素的滚动事件
  private registerScrollEvent() {
    this.scrollEvent$ = fromEvent(this.elm.nativeElement, 'scroll');
  }

  // 根据我们的需求来处理传入的滚动事件流，当滚动到给定的容器高度百分比时发起 API 请求
  private streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$.pipe(
      map(
        (e: any): ScrollPosition => ({
          sH: e.target.scrollHeight,
          sT: e.target.scrollTop,
          cH: e.target.clientHeight
        })
      ),
      // 出由当前值和前一个值组成的数组
      pairwise(),
      filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]))
    );
  }

  // 一旦达到我们设定的条件后，调用 scrollCallback 来发起 API 请求。
  private requestCallbackOnScroll() {
    this.requestOnScroll$ = this.userScrolledDown$;

    if (this.immediateCallback) {
      this.requestOnScroll$ = this.requestOnScroll$.pipe(startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]));
    }

    this.requestOnScroll$.pipe(exhaustMap(() => this.scrollCallback())).subscribe();
  }

  // 检查用户是否向下滚动，通过前一个滚动位置和当前滚动位置进行判断
  private isUserScrollingDown = (positions: { sT: number }[]): boolean => {
    return positions[0].sT < positions[1].sT;
  };

  // 检查滚动位置是否达到了要求的容器百分比高度
  private isScrollExpectedPercent = (position: ScrollPosition): boolean => {
    return (position.sT + position.cH) / position.sH > this.scrollPercent / 100;
  };
}
