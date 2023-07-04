import { filter, map, of, pluck, switchMap } from 'rxjs';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/pages/product/data-access/product.service';
import { IProduct } from 'src/app/shared/model/interface';
import { SearchService } from '../../data-access/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  keyword!: string;
  listProduct!: IProduct[];
  length: number = 0;
  pageSize: number = 0;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;

    const page = {
      offset: e.pageIndex * e.pageSize,
      limit: e.pageSize,
    };

    this.productService.readAllProduct(page).subscribe((data) => {
      this.length = data.DT.totalItems;
      this.listProduct = data.DT.data;
    });
  }

  constructor(
    private productService: ProductService,
    private readonly route: ActivatedRoute,
    private searchService: SearchService
  ) {}
  ngAfterViewInit(): void {
    const doc = document.querySelector('.mat-mdc-paginator-page-size-label');
    if (doc) {
      doc.textContent = 'Sản phẩm mỗi trang';
    }
  }
  ngOnInit(): void {
    const page = { offset: 0, limit: 5 };
    // this.productService.readAllProduct(page).subscribe((data) => {
    //   this.length = data.DT.totalItems;
    //   this.listProduct = data.DT.data;
    // });
    this.route.params
      .pipe(
        pluck('slug'),
        map((slug) => (this.keyword = slug)),
        switchMap((slug) => this.searchService.searchProduct(slug)),
        switchMap((data) => {
          const product = data.DT;
          return of(product);
        }),
        filter((product) => !!product)
      )
      .subscribe((data) => {
        // this.length = data.DT.totalItems;
        this.listProduct = data;
      });
  }
}
