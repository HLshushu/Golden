import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, PageEvent, MatSort, Sort, MatPaginatorIntl } from '@angular/material';
import { EmailsData } from './emails-data';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  @ViewChild('paginator', {static:false}) paginator: MatPaginator;
  @ViewChild('sortTable', {static:false}) sortTable: MatSort;
  @ViewChild('filter', {static:false}) filter: ElementRef;

  currentPage: PageEvent;
  currentSort: Sort;
  currentFilterData: string;

  emailsDataSource = new MatTableDataSource<EmailsData>();
  totalCount: number;

  emaiDatas : EmailsData[] = [
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:54:22Z"},
    {user:"jay", title:"culture", created_at :"2020-02-01T10:53:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:52:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:51:22Z"},
    {user:"baibai", title:"culture", created_at :"2020-02-01T10:50:22Z"},
    {user:"xiaoming", title:"aaa", created_at :"2020-02-01T10:38:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-02T10:54:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:59:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-04T10:54:22Z"},
    {user:"xiaoming", title:"bbbb", created_at :"2020-02-01T10:54:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:53:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:52:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:51:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:50:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:38:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-02T10:54:22Z"},
    {user:"xiaoming", title:"culture", created_at :"2020-02-01T10:59:22Z"},
    {user:"xiaoming", title:"ccc", created_at :"2020-02-04T10:54:22Z"}
];

constructor(private httpClient: HttpClient, private matPaginatorIntl: MatPaginatorIntl) {}

  ngOnInit() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.getIssuees();

    // 分頁切換時，重新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getIssuees();
    });

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        // 後端篩選就不需要指定filter了
        this.emailsDataSource.filter = (this.filter.nativeElement as HTMLInputElement).value;
      });

    // 後端篩選就用不到filterPredicate了
    this.emailsDataSource.filterPredicate = (data: any, filter: string): boolean => {
      return data.title.indexOf(filter) !== -1;
    };

    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };

    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';

  }

  changeSort(sortInfo: Sort) {
    if (sortInfo.active === 'created_at') {
      sortInfo.active = 'created';
    }
    this.currentSort = sortInfo;
    this.getIssuees();
  }

  getIssuees() {
    // const baseUrl = 'https://api.github.com/search/issues?q=repo:angular/material2';
    // let targetUrl = `${baseUrl}&page=${this.currentPage.pageIndex + 1}&per_page=${this.currentPage.pageSize}`;
    // if (this.currentSort.direction) {
    //   targetUrl = `${targetUrl}&&sort=${this.currentSort.active}&order=${this.currentSort.direction}`;
    // }
// 
    // this.httpClient
    //   .get<any>(targetUrl)
    //   .subscribe(data => {
    //     this.totalCount = data.total_count;
    //     this.emailsDataSource.data = data.items;
    //     // 從後端進行排序時，不用指定sort
    //     this.emailsDataSource.sort = this.sortTable;
    //     // 從後端取得資料時，就不用指定data srouce的paginator了
    //     this.emailsDataSource.paginator = this.paginator;
    // });

    this.totalCount = 10;
    this.emailsDataSource.data = this.emaiDatas;
    this.emailsDataSource.sort = this.sortTable;
    this.emailsDataSource.paginator = this.paginator;
  }

  reply(emailRow) {
    console.log('回覆信件', emailRow);
  }

  delete(emailRow) {
    console.log('刪除信件', emailRow);
  }
}