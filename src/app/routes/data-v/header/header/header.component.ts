import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  @Output() private outer = new EventEmitter<string>();
  constructor() { }


  ngOnInit(): void {
  }

  sendParent() {
    this.outer.emit('msg from child')
  }


}
