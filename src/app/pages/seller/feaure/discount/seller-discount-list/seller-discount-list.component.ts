import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../../data-access/discount/discount.service';
import { PageEvent } from '@angular/material/paginator';
import { IUser } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-seller-discount-list',
  templateUrl: './seller-discount-list.component.html',
  styleUrls: ['./seller-discount-list.component.scss'],
})
export class SellerDiscountListComponent implements OnInit {
  listDiscount!: any[];
  dataUser!: IUser;
  length: number = 0;
  pageSize: number = 0;
  pageIndex = 0;
  pageSizeOptions = [24, 48];
  showFirstLastButtons = true;
  pageEvent!: PageEvent;
  navTabs = [
    {
      name: 'Tất cả',
    },
    {
      name: 'Đang diễn ra',
    },
    {
      name: 'Sắp diễn ra',
    },
    {
      name: 'Đã kết thúc',
    },
  ];
  calculateDate(date_start: Date, date_end: Date) {
    const currentDate = new Date();

    if (currentDate < new Date(date_start)) {
      return 'Sắp diễn ra';
    } else if (
      currentDate >= new Date(date_start) &&
      currentDate <= new Date(date_end)
    ) {
      return 'Đang diễn ra';
    } else {
      return 'Kết thúc';
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;

    this.discountService
      .readAllDiscountPercentOfShop({
        shopID: this?.dataUser?.Shop?.id,
        offset: e.pageIndex * e.pageSize,
        limit: e.pageSize,
      })
      .subscribe((data) => {
        this.listDiscount = data.DT.data;
      });
  }

  formatDate(time: Date) {
    const date = new Date(time);
    return date.toLocaleString('en-GB');
  }
  constructor(
    private discountService: DiscountService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      this.dataUser = data;
      this.discountService
        .readAllDiscountPercentOfShop({
          shopID: data?.Shop?.id,
          offset: 0,
          limit: 24,
        })
        .subscribe((data) => {
          this.length = data.DT.totalItems;
          this.listDiscount = data.DT.data;
        });
    });
  }
}
