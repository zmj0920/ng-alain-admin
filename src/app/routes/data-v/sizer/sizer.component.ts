import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sizer',
  templateUrl: './sizer.component.html',
  styleUrls: ['./sizer.component.less']
})
export class SizerComponent {
  @Input() size!: number | string;
  @Output() readonly sizeChange = new EventEmitter<number>();

  dec() {
    this.resize(-1);
  }
  inc() {
    this.resize(+1);
  }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
