import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

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
export class HeaderComponent implements OnInit {
  @Output() private outer = new EventEmitter<string>();
  lessons = false;
  constructor() {}

  ngOnInit(): void {}
  sendParent(): void {
    this.outer.emit('msg from child');
  }
}
