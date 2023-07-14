import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../../data-access/discount/discount.service';

@Component({
  selector: 'app-seller-discount-list',
  templateUrl: './seller-discount-list.component.html',
  styleUrls: ['./seller-discount-list.component.scss'],
})
export class SellerDiscountListComponent implements OnInit {
  listDiscount!: any[];
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
      this.discountService
        .readAllDiscountPercentOfShop({
          shopID: data?.Shop?.id,
          offset: 0,
          limit: 10,
        })
        .subscribe((data) => {
          this.listDiscount = data.DT.data;
        });
    });
  }
}
