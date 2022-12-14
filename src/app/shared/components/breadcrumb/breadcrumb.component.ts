/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbs: any[] = [];
  constructor(private injector: Injector) {}

  ngOnInit(): void {}

  navigate(url: string, e: MouseEvent): void {
    e.preventDefault();
    this.injector.get(Router).navigateByUrl(url);
  }
}
