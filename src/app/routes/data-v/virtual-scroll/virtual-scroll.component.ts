import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.less']
})
export class VirtualScrollComponent implements OnInit {
  title = '';

  currentPage: number = 1;

  news: Array<any> = [];

  scrollCallback!: () => Observable<any>;

  constructor(private http: HttpClient) {
    this.scrollCallback = this.getStories.bind(this);
  }
  ngOnInit(): void {}

  getStories(): Observable<any> {
    return this.getLatestStories(this.currentPage).pipe(
      tap(res => {
        this.processData(res);
      })
    );
  }

  getLatestStories(page: number = 1): Observable<any> {
    return this.http.get(`https://api.hackerwebapp.com/news?page=${page}`);
  }

  private processData = (news: any) => {
    this.currentPage++;
    this.news = this.news.concat(news);
  };
}
