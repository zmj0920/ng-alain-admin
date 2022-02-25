import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { RenderIconSource } from '../../directives/render-icon.directive';
import { TColumnSource } from '../ng-table/tcolumn-source.service';

@Component({
  selector: 'ng-page-header',
  templateUrl: './ng-page-header.component.html',
  styleUrls: ['./ng-page-header.component.less'],
  providers: [RenderIconSource, TColumnSource],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgPageHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Output() tabClick = new EventEmitter<number>();
  tabSelectedIndex = 0;
  @Input() tab!: TemplateRef<void>;
  @Input() contentTpl!: TemplateRef<void>;
  isTabTpl = false;
  @Input() breadcrumbs: any[] = [];
  @Input() moreRowActions: any[] = [];

  @Input() groupActions: any[] = [];

  @Input() rowActions: any[] = [];

  constructor(private injector: Injector, private columnSource: TColumnSource) {}
  ngOnInit(): void {}

  clickTab(index: number) {
    this.tabClick.emit(index);
  }
  refresh() {
    console.log('refresh');
  }

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
