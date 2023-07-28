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
  pageSizeOptions = [20, 30, 40];
  showFirstLastButtons = true;
  pageEvent!: PageEvent;

  shuffleArray(array: []) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;

    const page = {
      offset: e.pageIndex * e.pageSize,
      limit: e.pageSize,
    };

    this.productService.readAllProductActive(page).subscribe((data) => {
      this.length = data.DT.totalItems;
      this.listProduct = this.shuffleArray(data.DT.data);
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
    const page = { offset: 0, limit: 20 };
    this.productService.readAllProductActive(page).subscribe((data) => {
      this.length = data.DT.totalItems;
      this.listProduct = this.shuffleArray(data.DT.data);
    });
  }
}
