import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nz-page-header',
  templateUrl: './nz-page-header.component.html',
  styleUrls: ['./nz-page-header.component.less']
})
export class NzPageHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  constructor() {}

  ngOnInit(): void {}
}
