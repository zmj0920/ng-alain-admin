import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { BookService } from '@services/book/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Output() readonly outer = new EventEmitter<string>();
  lessons = false;
  heroListLessons = true;
  loginText = '登录';
  signUpText = '注册';
  name: string;
  constructor(bookService: BookService) {
    this.name = bookService.getName();
  }
  // @ViewChild('defaultTabButtons', { static: true }) private defaultTabButtons!: TemplateRef<any>;

  sendParent(): void {
    this.outer.emit('msg from child');
  }

  login(): void {}

  signUp(): void {}
}
