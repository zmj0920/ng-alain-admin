import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

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
  // encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Output() private outer = new EventEmitter<string>();
  lessons = false;
  constructor() {}

  ngOnInit(): void {}
  sendParent() {
    this.outer.emit('msg from child');
  }

  callPhone(value) {
    console.log(value);
  }
}
