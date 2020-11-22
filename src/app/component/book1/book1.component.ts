import { addBook } from '@store/actions';
import { AppStoreModule } from '@store/store.module';
import { Component, OnInit, Attribute } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, of, Observable, from, timer, Subject, interval } from 'rxjs';
import { filter, map, take, multicast, refCount, first } from 'rxjs/operators';


@Component({
  selector: 'app-book1',
  templateUrl: './book1.component.html',
  styleUrls: ['./book1.component.css']
})

export class Book1Component implements OnInit {
  bookName: string;
  author: string;
  price: number;
  title: string;
  profileForm = this.fb.group({
    bookName: ['', Validators.required],
    author: ['', Validators.required],
    price: ['', Validators.required],
    createAt: Date.now()
  });

  private subscription: Subscription;

  constructor(@Attribute('title') title: string, private fb: FormBuilder, private store: Store<AppStoreModule>) {
    this.title = title;
    // console.log(this.title);
  }

  // tslint:disable-next-line: typedef
  demo1() {
    first()(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.demo1();
    // this.loggingIdentity({ length: 10, value: 3 });
    // this.subscription = of('桃子', '鲤鱼').pipe(
    //   filter(v => v === '桃子'),
    //   map(v => v + '罐头')
    // ).subscribe(console.log);

    // const num$ = of(1, 2, 3, 4).pipe(
    //   map((item) => console.log(item)),
    // )
    // num$.subscribe();


    // const source$ = from([1, 2, 3]);
    // source$.subscribe(console.log);
  }
  // alertMsg:string


  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {

    // 取消订阅
    this.subscription.unsubscribe();
  }

  public submit(): void {
    if (this.bookName && this.author && this.price) {
      this.store.dispatch(addBook({ book: { bookName: this.bookName, author: this.author, price: this.price, createAt: Date.now() } }));
      // this.bookName = '';
      // this.author = '';
      // this.price = null;
    }
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.store.dispatch(addBook({ book: { ...this.profileForm.value } }));
  }

  // tslint:disable-next-line: typedef
  updateProfile() {
    this.profileForm.patchValue({
      bookName: 'Nancy'
    });
  }
}
