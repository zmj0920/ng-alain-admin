import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { BookService } from '@services/book/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      :host ::ng-deep .deep-red {
        color: red;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() private outer = new EventEmitter<string>();
  lessons = false;
  heroListLessons = true;
  loginText = '登录';
  signUpText = '注册';
  name: string;
  constructor(bookService: BookService) {
    this.name = bookService.getName();
  }
  @ViewChild('defaultTabButtons', { static: true }) private defaultTabButtons!: TemplateRef<any>;

  ngOnInit(): void {}
  sendParent(): void {
    this.outer.emit('msg from child');
  }

  ngAfterViewInit(): void {
    console.log(this.defaultTabButtons.elementRef);
  }

  login(): void {}

  signUp(): void {}
}
