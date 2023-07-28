import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductService } from 'src/app/pages/product/data-access/product.service';
import { IProduct } from 'src/app/shared/model/interface';
import { statusProduct } from 'src/app/shared/model/model';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  productList!: IProduct[];
  length: number = 0;
  pageSize: number = 0;
  pageIndex = 0;
  pageSizeOptions = [24, 48];
  showFirstLastButtons = true;
  pageEvent!: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;

    this.productService
      .readAllProduct({
        offset: e.pageIndex * e.pageSize,
        limit: e.pageSize,
      })
      .subscribe((data) => {
        this.length = data.DT.totalItems;
        this.productList = data.DT.data;
      });
  }
  handleBanProduct(productID: number) {
    const rawData = {
      productID,
      statusID: statusProduct.BAN,
    };
    this.productService.updateStatusProduct(rawData).subscribe((data) => {
      if (+data.EC === 0) {
        this.productService
          .readAllProduct({ offset: 0, limit: 24 })
          .subscribe((val) => {
            this.productList = val.DT.data;
            this.pageIndex = 0;
            this.toastService.success(data.EM);
          });
      } else {
        this.toastService.success(data.EM);
      }
    });
  }
  handleBrowse(productID: number) {
    const rawData = {
      productID,
      statusID: statusProduct.ACTIVE,
    };
    this.productService.updateStatusProduct(rawData).subscribe((data) => {
      if (+data.EC === 0) {
        this.productService
          .readAllProduct({ offset: 0, limit: 24 })
          .subscribe((val) => {
            this.productList = val.DT.data;
            this.pageIndex = 0;
            this.toastService.success(data.EM);
          });
      } else {
        this.toastService.success(data.EM);
      }
    });
  }
  constructor(
    private productService: ProductService,
    private toastService: ToastrService
  ) {}
  ngOnInit(): void {
    this.productService
      .readAllProduct({ offset: 0, limit: 24 })
      .subscribe((data) => {
        this.length = data.DT.totalItems;
        this.productList = data.DT.data;
      });
  }
}
