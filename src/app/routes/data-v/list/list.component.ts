import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subscriber, Subject, fromEvent, forkJoin, merge, from, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ajaxPost } from 'rxjs/internal/observable/dom/AjaxObservable';
import { filter, map, mapTo, mergeAll, repeatWhen, retryWhen, switchMap, takeUntil, tap } from 'rxjs/operators';

const SparkMD5 = require('spark-md5');
const apiHost = 'http://127.0.0.1:5000';

interface FileInfo {
  fileSize: number;
  fileMD5: string;
  lastUpdated: string;
  fileName: string;
}

interface ChunkMeta {
  fileSize: number;
  chunkSize: number;
  chunks: number;
  fileKey: string;
  fileName: string;
}
// 暂停  继续 正在上传  上传完成
type Action = 'pause' | 'resume' | 'progress' | 'complete';

@Component({
  selector: 'app-list',
  styleUrls: ['./list.component.less'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  private action$ = new Subject<{ name: Action; payload?: any }>();
  // 暂停上传
  private pause$ = this.action$.pipe(filter(ac => ac.name === 'pause'));
  // 继续上传
  private resume$ = this.action$.pipe(filter(ac => ac.name === 'resume'));
  private concurrency = 20;
  btnStatus = 'paperclip';
  uploadDisable = false;
  nzPercent = 0;
  readProgress = 0;

  constructor(public msgSrv: NzMessageService) {}

  ngOnInit(): void {
    const $attachment = document.getElementById('attachment') as HTMLElement;
    const click$ = fromEvent($attachment, 'click').pipe(
      filter(() => this.btnStatus !== 'paperclip'),
      tap(() => {
        if (this.btnStatus === 'pause') {
          this.action$.next({ name: 'pause' });
          this.btnStatus = 'play';
        } else if (this.btnStatus === 'play') {
          this.action$.next({ name: 'resume' });
          this.buildPauseIcon();
        }
      }),
      map(() => ({ action: this.btnStatus === 'pause' ? 'PAUSE' : 'RESUME', payload: null }))
    );

    const progress$ = this.action$.pipe(
      filter(action => action.name === 'progress'),
      map(action => action.payload),
      tap((r: number) => {
        const percent = Math.round(r * 100);
        this.nzPercent = percent > 1 ? percent - 1 : percent;
      }),
      map(r => ({ action: 'PROGRESS', payload: r }))
    );

    const upload$ = fromEvent($attachment, 'change').pipe(
      map((r: any) => r.target!.files[0]),
      filter((f: any) => !!f),
      tap(() => (this.uploadDisable = true)),
      switchMap(i => this.readFileInfo(i)),
      switchMap(i => this.postUploadChunk(i)),
      filter((data: any) => {
        if (data.chunkMeta.status === 0) {
          this.nzPercent = 100;
          this.msgSrv.success('文件已秒传');
          this.resetStatus();
        }
        return data.chunkMeta.status === 1;
      }),
      tap(() => this.buildPauseIcon()),
      switchMap(({ blobs, chunkMeta }) => this.uploadChunks(blobs, chunkMeta)),
      switchMap((r: ChunkMeta) => this.postMergeStatus(r)),
      tap(() => {
        this.nzPercent = 100;
        this.msgSrv.success('文件上传成功！');
        this.resetStatus();
      })
    );
    merge(...[upload$, click$, progress$]).subscribe();
  }

  // 上传切片文件 blob切片文件总数  chunkMeta 分片信息
  private uploadChunks(blobs: Blob[], chunkMeta: ChunkMeta) {
    const uploaded: number[] = [];
    const dists = blobs.map((blob, index) => {
      let currentLoaded = 0;
      return this.uploadChunk(chunkMeta, index, blob).pipe(
        tap(r => {
          currentLoaded = r.loaded / chunkMeta.fileSize;
          uploaded[index] = currentLoaded;
          const percent = uploaded.reduce((acc, val) => acc + (val ? val : 0));
          this.action$.next({ name: 'progress', payload: percent });
        })
      );
    });
    // 控制并发数量  20 个分片同时上传
    const uploadStream = from(dists).pipe(mergeAll(this.concurrency));
    return forkJoin([uploadStream]).pipe(mapTo(chunkMeta));
  }

  // 重置上传状态
  private resetStatus() {
    const $file = document.getElementById('file') as HTMLInputElement;
    timer(3000).subscribe(() => {
      this.btnStatus = 'paperclip';
      this.nzPercent = 0;
      this.readProgress = 0;
      this.uploadDisable = false;
      $file.value = '';
    });
  }
  // 更新上传状态
  private buildPauseIcon() {
    this.btnStatus = 'pause';
    this.uploadDisable = true;
  }

  // 读取文件信息
  private readFileInfo(file: any): Observable<{ file: File; fileinfo: FileInfo }> {
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const chunks = 100;
    let currentChunk = 0;
    return new Observable((observer: Subscriber<{ file: File; fileinfo: FileInfo }>) => {
      fileReader.onload = (e: Event) => {
        spark.append((e.target as FileReader).result);
        currentChunk++;
        if (currentChunk < chunks) {
          this.loadNext(file, currentChunk, fileReader);
        } else {
          const fileMD5 = spark.end();
          observer.next({
            file,
            fileinfo: {
              fileMD5,
              fileSize: file.size,
              lastUpdated: file.lastModifiedDate.toISOString(),
              fileName: file.name
            }
          });
          observer.complete();
        }
      };

      fileReader.onerror = function () {
        console.warn('oops, something went wrong.');
      };
      this.loadNext(file, currentChunk, fileReader);
    });
  }

  // 读取分片文件信息
  private loadNext(file: File, currentChunk: number, fileReader: FileReader) {
    const blobSlice = File.prototype.slice;
    const chunkSize = file.size / 100;
    const start = currentChunk * chunkSize;
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    this.readProgress = currentChunk + 1;
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }

  // 根据接口返回切片数据，处理文件分片数据
  private slice(file: File, n: number, chunkSize: number): Blob[] {
    const result: Blob[] = [];
    for (let i = 0; i < n; i++) {
      const startSize = i * chunkSize;
      const slice = file.slice(startSize, i === n - 1 ? startSize + (file.size - startSize) : (i + 1) * chunkSize);
      result.push(slice);
    }
    return result;
  }

  // 上传单个文件分片
  private uploadChunk(meta: ChunkMeta, index: number, blob: Blob): Observable<ProgressEvent> {
    return new Observable((subscriber: Subscriber<ProgressEvent>) => {
      const ajax$ = ajax({
        url: `${apiHost}/upload/chunk/${meta.fileKey}?chunk=${index + 1}&chunks=${meta.chunks}`,
        body: blob,
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/octet-stream' },
        progressSubscriber: subscriber
      })
        .pipe(
          takeUntil(this.pause$),
          repeatWhen(() => this.resume$)
        )
        .subscribe();
      return () => ajax$.unsubscribe();
    }).pipe(retryWhen(() => this.resume$));
  }

  // 接口获取文件的分片信息
  private postUploadChunk(i: { fileinfo: any; file: File }) {
    return ajaxPost(`${apiHost}/upload/chunk`, i.fileinfo).pipe(
      map(r => {
        const blobs = this.slice(i.file, r.response.chunks, r.response.chunkSize);
        return { blobs, chunkMeta: r.response, file: i.file };
      })
    );
  }

  // 文件上传完成，通知服务端上传完成，获取后端合并结果
  private postMergeStatus(r: ChunkMeta) {
    return ajaxPost(`${apiHost}/upload/merge`, r).pipe(
      mapTo({
        action: 'UPLOAD_SUCCESS',
        payload: r
      })
    );
  }
}
