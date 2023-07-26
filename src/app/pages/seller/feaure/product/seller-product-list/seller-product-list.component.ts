import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { ProductService } from '../../../data-access/product.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { IProduct, IUser } from 'src/app/shared/model/interface';
import { statusProduct } from 'src/app/shared/model/model';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { OrderService } from '../../../data-access/order.service';

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.scss'],
})
export class SellerProductListComponent implements OnInit, AfterViewChecked {
  dataUser!: IUser;
  productList!: any[];
  productOptions!: any[];
  currentOption: string = 'Tất cả';
  length: number = 0;
  pageSize: number = 0;
  pageIndex = 0;
  pageSizeOptions = [20, 30, 40];
  showFirstLastButtons = true;
  pageEvent!: PageEvent;
  calculatedRevenue: number[] = [];
  productRevenues: { [cacheKey: string]: Observable<number> } = {};

  navTabs = [
    {
      name: 'Tất cả',
      isActive: true,
    },
    {
      name: 'Đang hoạt động',
      isActive: false,
    },
    // {
    //   name: 'Hết hàng',
    //   isActive: false,
    // },
    {
      name: 'Chờ duyệt',
      isActive: false,
    },
    {
      name: 'Vi phạm',
      isActive: false,
    },
  ];

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;

    this.handlePageWithOption(
      e.pageIndex * e.pageSize,
      e.pageSize,
      this.currentOption
    );
  }

  calculateRevenue(
    productID: number,
    productPriceOptionID: number
  ): Observable<number> {
    const cacheKey = productPriceOptionID
      ? `${productID}-${productPriceOptionID}`
      : `${productID}`;

    if (!this.productRevenues[cacheKey]) {
      this.productRevenues[cacheKey] = this.orderService
        .readRevenueOfProduct({ productID, productPriceOptionID })
        .pipe(map((data) => data.DT));
    }

    return this.productRevenues[cacheKey];
  }

  handlePageWithOption(offset: number, limit: number, current: string) {
    if (current === 'Tất cả') {
      this.productService
        .readAllProductOfShop({
          shopID: this.dataUser?.Shop?.id,
          offset,
          limit,
        })
        .subscribe((data) => {
          this.length = data.DT.totalItems;
          this.productList = data.DT.data;
        });
    }
    if (current === 'Đang hoạt động') {
      this.productService
        .readAllProductWithStatusOfShop({
          shopID: this.dataUser?.Shop?.id,
          statusID: statusProduct.ACTIVE,
          offset,
          limit,
        })
        .subscribe((data) => {
          this.length = data.DT.totalItems;
          this.productList = data.DT.data;
        });
    }
    if (current === 'Chờ duyệt') {
      this.productService
        .readAllProductWithStatusOfShop({
          shopID: this.dataUser?.Shop?.id,
          statusID: statusProduct.PENDING,
          offset,
          limit,
        })
        .subscribe((data) => {
          this.length = data.DT.totalItems;
          this.productList = data.DT.data;
        });
    }
    if (current === 'Vi phạm') {
      this.productService
        .readAllProductWithStatusOfShop({
          shopID: this.dataUser?.Shop?.id,
          statusID: statusProduct.BAN,
          offset,
          limit,
        })
        .subscribe((data) => {
          this.length = data.DT.totalItems;
          this.productList = data.DT.data;
        });
    }
  }

  handleChooseOption(current: string) {
    this.navTabs.forEach((item) => {
      item.isActive = false;
      if (item.name === current) {
        item.isActive = true;
      }
    });
    this.currentOption = current;
    this.handlePageWithOption(0, 20, current);
    this.pageIndex = 0;
  }

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}
  ngAfterViewChecked(): void {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const type = params.get('type');
      this.authService.dataUser$.subscribe((data) => {
        this.dataUser = data;
        if (type === 'pending') {
          this.handleChooseOption('Chờ duyệt');
          this.productService
            .readAllProductWithStatusOfShop({
              shopID: data?.Shop?.id,
              statusID: statusProduct.PENDING,
              offset: 0,
              limit: 20,
            })
            .subscribe((data) => {
              this.length = data.DT.totalItems;
              this.productList = data.DT.data;
            });
        } else {
          this.handleChooseOption('Tất cả');
          this.productService
            .readAllProductOfShop({
              shopID: data?.Shop?.id,
              offset: 0,
              limit: 20,
            })
            .subscribe((data) => {
              this.length = data.DT.totalItems;
              this.productList = data.DT.data;
              console.log(
                '🚀 ~ file: seller-product-list.component.ts:187 ~ SellerProductListComponent ~ .subscribe ~ this.productList:',
                this.productList
              );
            });
        }
      });
    });
  }
}
