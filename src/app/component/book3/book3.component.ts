import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map  } from 'rxjs/internal/operators';
import { Observable, Observer } from 'rxjs';
import { BookService } from '../../service/book.service';
@Component({
  selector: 'app-book3',
  templateUrl: './book3.component.html',
  styleUrls: ['./book3.component.css']
})
export class Book3Component implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) { }


  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
 // @Input() myTitle: string; 直接取值使用变量名字
  @Input('myTitle') id: string; //接收并更改变量名字赋值

  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  del(data){
    this.deleteEvent.emit(data)
  }

  sendMessage() {
    this.bookService.sendMessage('显示成功');
  }


  ngOnInit() {
    
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      hobby: [''],
    });

    //  监听整个表单
    this.form.valueChanges
    .pipe(
      filter(() => this.form.valid),
      map(data => {
        data.lastTime = new Date();
        return data
     })
    )
    .subscribe(res => console.log(res));
  }

}
