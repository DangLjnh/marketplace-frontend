import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-discount-list',
  templateUrl: './seller-discount-list.component.html',
  styleUrls: ['./seller-discount-list.component.scss'],
})
export class SellerDiscountListComponent {
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
}
