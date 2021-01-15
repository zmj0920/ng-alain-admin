import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PdfChangeEvent, PdfComponent, PdfZoomScale } from '@delon/abc/pdf';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-pdf-design',
  templateUrl: './pdf-design.component.html',
  styleUrls: ['./pdf-design.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfDesignComponent implements OnInit {
  @ViewChild('pdf')
  private comp!: PdfComponent;
  src = `https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf`;
  pi = 1;
  total = 0;
  renderText = true;
  stickToPage = true;
  originalSize = true;
  fitToPage = false;
  showAll = true;
  zoomScale: PdfZoomScale = 'page-width';
  rotation = 0;
  zoom = 1;
  autoReSize = true;
  outline = false;
  outlineList: any;
  q = '';
  search$ = new Subject<string>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.search$.subscribe((q: string) => {
      if (q !== this.q) {
        this.q = q;
        this.comp.findController.executeCommand('find', {
          query: this.q,
          highlightAll: true,
        });
      } else {
        this.comp.findController.executeCommand('findagain', {
          query: this.q,
          highlightAll: true,
        });
      }
    });
  }

  change(ev: PdfChangeEvent): void {
    switch (ev.type) {
      case 'loaded':
        this.total = ev.total!;
        this.loadOutline();
        break;
      case 'pi':
        this.pi = ev.pi!;
        break;
    }

    if (ev.type !== 'load-progress') { console.log(ev); }
  }

  uploadSrc(src: string): void {
    this.src = src;
  }

  changeShowAllPages(_val: boolean): void {
    this.stickToPage = true;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.src = e.target.result;
      this.cdr.detectChanges();
    };
    reader.readAsArrayBuffer(file as any);
    return false;
  }

  loadOutline(): void {
    this.comp.pdf.getOutline().then((outline: any[]) => {
      this.outlineList = outline;
    });
  }

  navigateTo(dest: any): void {
    this.comp.linkService.navigateTo(dest);
  }
}
