ng g ng-alain:module sys

弹窗模块
ng g ng-alain:edit [page name] --modal=false


模板
ng g ng-alain:tpl [your template name] [name] -m=trade


# Angular 表单



## ReplaySubject

ReplaySubject是一种特殊类型的Subject，它允许您保留源Observable的所有值，并为订阅者提供一组值。

这意味着，如果在源Observable结束之前订阅了ReplaySubject，您将可以接收到来自源Observable的所有值。例如：

```
const subject = new ReplaySubject(3); // 保留3个值

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe(x => console.log(x)); // 输出: 2, 3, 4
```

在上面的代码中，我们创建了一个ReplaySubject，并将其初始化为保留3个值。然后，我们向ReplaySubject发送了4个值。由于我们保留了3个值，所以只有最后3个值会被保留。因此，当我们订阅ReplaySubject时，只能接收到最后3个值，即2、3、4。

除了保留值的数量，您还可以指定一个时间间隔，表示只保留最后多长时间内的值。例如：

```
const subject = new ReplaySubject(100, 500); // 保留500ms内的值

subject.next(1);
subject.next(2);

// 延迟1s
setTimeout(() => {
  subject.next(3);
  subject.next(4);

  subject.subscribe(x => console.log(x)); // 输出: 3, 4
}, 1000);

```

在上面的代码中，我们创建了一个ReplaySubject，并将其初始化为保留500ms内的值。然后，我们向ReplaySubject发送了2个值


## zip

zip操作符，它可以将多个可观察对象的值合并成一个新的可观察对象。

zip操作符在多种情况下都非常有用。例如，假设您有两个数组，并希望按顺序将它们的元素合并成一个新的数组。您可以使用zip操作符来实现这一目的。例如：

```
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const example = zip(array1, array2);

// 输出: [1,4], [2,5], [3,6]
const subscribe = example.subscribe(val => console.log(val));

```

zip与concat、merge有一个明显的不同

```
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

```

## concat 

concat操作符，它可以将多个可观察对象的值按顺序连接成一个新的可观察对象。
当顺序很重要时，使用此操作符，例如当你需要按顺序的发送 HTTP 请求时。
按顺序订阅 Observables，但是只有当一个完成并让我知道，然后才会开始下一个。

```
const source1 = of(1, 2, 3);
const source2 = of(4, 5, 6);
const source3 = of(7, 8, 9);

const example = concat(source1, source2, source3);

// 输出: 1, 2, 3, 4, 5, 6, 7, 8, 9
const subscribe = example.subscribe(val => console.log(val));

```

需要注意的是，concat操作符会按顺序连接多个可观察对象，并等待每个可观察对象完成后才进行下一个

## merge


merge操作符，它可以将多个可观察对象的值合并成一个新的可观察对象，merge操作符会将多个可观察对象的值混合在一起，并同时发出。因此，订阅者可能会收到来自不同可观察对象的值，而不是按顺序接收。

与concat类似，merger操作符也可将两个或多个数据流合并到一个数据流中，但不再是以首尾相连的形式，
而是在第一时间订阅所有传入的Observable的值，任意一个Observable对象中的值发生变化，则立即传给下游的Observable对象。

```
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
```

## forkJoin

forkJoin操作符，它可以将多个可观察对象的最后一个值合并成一个新的可观察对象。与zip操作符不同，forkJoin操作符不会等待所有可观察对象都发出值，而是等待所有可观察对象都完成，然后发出所有可观察对象的最后一个值。

forkJoin操作符通常用于执行多个并行异步操作，并等待它们都完成后再继续执行后续操作。

```
const source1 = of(1, 2, 3);
const source2 = of(4, 5, 6);

const example = forkJoin(
  source1.pipe(delay(1000)),
  source2.pipe(delay(2000))
);

// 输出: [3, 6]
const subscribe = example.subscribe(val => console.log(val));
```

需要注意的是，forkJoin操作符会等待所有可观察对象都完成，然后发出所有可观察对象的最后一个值。
因此，如果某个可观察对象在完成前发生错误，那么forkJoin操作符会立即发出错误通知，并终止执行。

## combineLatest

combineLatest操作符，它可以将多个可观察对象的最新值合并成一个新的可观察对象。与zip操作符不同，combineLatest操作符不会等待所有可观察对象都发出值，而是只要任意一个可观察对象发出新值，就会发出一个新值。

需要注意的是，combineLatest操作符会发出所有可观察对象的最新值，并不会按顺序发出。因此，combineLatest操作符通常用于实时监测多个数据源的变化，并同时响应它们的变化。例如，假设您有两个异步操作，分别返回两个可观察对象：


```
const source1 = interval(1000);
const source2 = interval(2000);

const example = combineLatest(source1, source2);

// 输出: [1, 1], [1, 2], [2, 2], [2, 3], [3, 3], [3, 4], [4, 4]
const subscribe = example.subscribe(val => console.log(val));

```


## partition

partition操作符，它可以将一个可观察对象拆分成两个可观察对象，一个包含符合指定条件的值，另一个包含不符合条件的值。


```
const source = of(1, 2, 3, 4, 5, 6);
const [even, odd] = partition(source, val => val % 2 === 0);

// 输出: 2, 4, 6
const subscribe = even.subscribe(val => console.log(val));

// 输出: 1, 3, 5
const subscribe = odd.subscribe(val => console.log(val));

```

需要注意的是，partition操作符只会将源可观察对象拆分成两个可观察对象，并不会对它们进行排序或分组。因此，每个可观察对象的值都是按照
源可观察对象的发送顺序保留的。例如，在上面的例子中，两个可观察对象都是按照source发送值的顺序发送值的。

此外，partition操作符只会将符合条件的值发送到第一个可观察对象，不符合条件的值发送到第二个可观察对象。如果源可观察对象发送的值都符合条件，那么第二个可观察对象将不会发出任何值。如果源可观察对象发送的值都不符合条件，那么第一个可观察对象将不会发出任何值。


## race

race操作符，它可以将多个可观察对象合并成一个可观察对象，并发出第一个可观察对象发出的值。这意味着，如果有多个可观察对象都发出了值，那么只有第一个可观察对象发出的值会被发送出去。

```
const source1 = of(1, 2, 3);
const source2 = of(4, 5, 6);
const example = race(source1, source2);

// 输出: 1
const subscribe = example.subscribe(val => console.log(val));

```

需要注意的是，race操作符只会发出第一个可观察对象发出的值，并且会忽略其他可观察对象发出的值。因此，只有在源可观察对象发送的值是按顺序发送的情况下，才能使用race操作符。

另外，race操作符只会发出第一个可观察对象发出的第一个值，不会发出第一个可观察对象发出的后续值。例如，在上面的例子中，example只会发出数字1，并不会发出数字2和3。



## tap 

tap 操作符可以在不修改原来的 Observable 序列的情况下，执行一些额外的副作用。它接收一个函数作为参数，
该函数可以接收到当前 Observable 序列的数据，并可以执行一些额外的操作。

常见的场景包括：

在订阅前打印日志，方便调试
在发送网络请求前显示 loading 状态
在接收到数据后更新 UI 等
通常情况下，tap 操作符会被配合着 other 操作符（如 map、filter、switchMap 等）一起使用，方便在不影响原来的 Observable 序列的情况下执行额外的副作用。

```
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

const numbers$ = from([1, 2, 3]);

numbers$.pipe(
  tap(value => console.log(`Value: ${value}`))
).subscribe(() => {});

// Output:
// Value: 1
// Value: 2
// Value: 3

```


## every

 every 操作符用于判断一个 Observable 序列中的所有值是否都满足某个条件。

它接收一个函数作为参数，该函数返回一个布尔值，表示每个值是否满足条件。

如果所有值都满足条件，则返回 true；否则返回 false。

下面是一个例子，展示了如何使用 every 操作符判断一个 Observable 序列中的所有值是否都大于等于 0：

```
import { from } from 'rxjs';
import { every } from 'rxjs/operators';

const numbers$ = from([1, 2, 3, -1]);

numbers$.pipe(
  every(value => value >= 0)
).subscribe(result => {
  console.log(`All values are greater than or equal to 0: ${result}`);
});

// Output:
// All values are greater than or equal to 0: false

```
可以看到，我们通过 every 操作符判断了所有值是否都大于等于 0，并在订阅后输出了结果。

## switchMap 

switchMap 操作符用于将一个 Observable 序列转换为另一个 Observable 序列。
它接收一个函数作为参数，该函数接收一个值并返回一个 Observable，表示将原来的值转换为新的 Observable 序列。
switchMap 操作符的一个特点是，如果在转换过程中，新的 Observable 序列产生了新的值，则会取消订阅原来的 Observable 序列，转而订阅新的 Observable 序列。
下面是一个例子，展示了如何使用 switchMap 操作符将一个 Observable 序列转换为另一个 Observable 序列：

```
import { fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const clicks$ = fromEvent(document, 'click');

clicks$.pipe(
  switchMap(() => from([1, 2, 3]))
).subscribe(value => {
  console.log(`Value: ${value}`);
});

// Output:
// Value: 1
// Value: 2
// Value: 3
```
可以看到，我们通过 switchMap 操作符将一个事件序列转换为了一个固定的数字序列，并在订阅后输出了每个值。