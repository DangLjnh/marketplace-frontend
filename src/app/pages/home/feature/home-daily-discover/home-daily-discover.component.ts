import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';
import { ProductService } from 'src/app/pages/product/data-access/product.service';
import { IProduct } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-home-daily-discover',
  templateUrl: './home-daily-discover.component.html',
  styleUrls: ['./home-daily-discover.component.scss'],
})
export class HomeDailyDiscoverComponent implements OnInit, AfterViewInit {
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

  constructor(private productService: ProductService) {}
  ngAfterViewInit(): void {
    const doc = document.querySelector('.mat-mdc-paginator-page-size-label');
    if (doc) {
      doc.textContent = 'Sản phẩm mỗi trang';
    }
  }
  ngOnInit(): void {
    const page = { offset: 0, limit: 5 };
    this.productService.readAllProduct(page).subscribe((data) => {
      this.length = data.DT.totalItems;
      this.listProduct = data.DT.data;
    });
  }
}
