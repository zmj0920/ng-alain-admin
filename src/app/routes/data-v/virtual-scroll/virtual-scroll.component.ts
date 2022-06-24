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

  option = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' }
  ];

  constructor(private http: HttpClient) {
    this.scrollCallback = this.getStories.bind(this);
  }
  ngOnInit(): void {}

  chage(val: any) {
    console.log(val);
  }

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
