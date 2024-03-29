/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { RenderSource } from '../../directives/render.directive';
import { TColumnSource } from '../ng-table/tcolumn-source.service';

@Component({
  selector: 'ng-page-header',
  templateUrl: './ng-page-header.component.html',
  styleUrls: ['./ng-page-header.component.less'],
  providers: [RenderSource, TColumnSource],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgPageHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() tab!: TemplateRef<void>;
  @Input() contentTpl!: TemplateRef<void>;
  @Input() breadcrumbs: any[] = [];
  @Input() moreRowActions: any[] = [];
  @Input() groupActions: any[] = [];
  @Input() rowActions: any[] = [];
  @Input() globalActions: any[] = [];
  @Input() enableBack = false;
  @Input() headerHidden = true;

  constructor(private injector: Injector, private columnSource: TColumnSource) {}
  ngOnInit(): void {}

  navigate(url: string, e: MouseEvent): void {
    e.preventDefault();
    this.injector.get(Router).navigateByUrl(url);
  }

  ngOnChanges(changes: any): void {}

  ngAfterViewInit(): void {
    this.columnSource.restoreAllRender(this.breadcrumbs);
    this.columnSource.restoreAllRender(this.rowActions);
    this.columnSource.restoreAllRender(this.moreRowActions);
    this.columnSource.restoreGroupsColumns(this.groupActions);
  }
}
